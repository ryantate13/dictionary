import Dexie from 'dexie';

const db = new Dexie('dictionary'),
    dict = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z'
    ];

db.version(1).stores({
    words: '&search_term',
    retrieved: '&id,status'
});

export async function init(){
    const retrieved = await get_retrieved();

    dict.forEach(letter => {
        if(!retrieved[letter])
            fetch(`${process.env.PUBLIC_URL}/dictionary/${letter}.json`)
                .then(r => r.json())
                .then(async words => {
                    const word_definitions = Object.values(words).map(
                        word => ({...word, search_term: word.word.toLowerCase()})
                    );
                    db.transaction('rw', db.words, db.retrieved, async () => {
                        db.words.bulkPut(word_definitions);
                        db.retrieved.put({id: letter, status: true});
                    }).then(() => {
                        console.log({letter, word_count: word_definitions.length});
                    });
                });
    });
}

export async function get_retrieved(){
    const retrieved = await db.table('retrieved').toArray();
    return retrieved.reduce((a,c) => ({...a, [c.id]: c.status}), {});
}

export async function get_matches(prefix, limit = 26){
    const  get_matches = () => db.words.where('search_term').startsWith(prefix.toLowerCase()),
        matches = limit ?
            await get_matches().limit(limit)
            :
            await get_matches(),
        arr = await matches.toArray();
    return arr.map(m => m.word);
}

export async function get_word(word) {
    return await db.words.get(word.toLowerCase());
}

export async function invalidate_cache(){
    await db.retrieved.where('id').anyOf(...dict).delete();
    await db.words.where('search_term').startsWithAnyOf(...dict).delete();
}