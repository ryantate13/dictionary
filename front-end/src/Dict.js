import Dexie from 'dexie';

const db = new Dexie('dictionary');

db.version(1).stores({
    words: '&word',
    retrieved: '&id,status'
});

export async function init(){
    const dict = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z'
    ];

    const retrieved = await get_retrieved();

    dict.forEach(letter => {
        if(!retrieved[letter])
            fetch(`/dictionary/${letter}.json`)
                .then(r => r.json())
                .then(async words => {
                    const word_definitions = Object.values(words);
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
    const matches = await db.words.where('word').startsWithIgnoreCase(prefix),
        arr = await matches.toArray();
    const words = arr.map(m => m.word);
    return limit ? words.slice(0,limit) : words;
}

export async function get_word(word) {
    return await db.words.get(word);
}