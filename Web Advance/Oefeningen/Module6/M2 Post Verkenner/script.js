const postsContainer = document.getElementById('posts-container');
const zoektermInput = document.getElementById('zoekterm');
const sorteerSelect = document.getElementById('sorteer');
const limietSelect = document.getElementById('limiet');
const toepassenKnop = document.getElementById('toepassen');

let allePosts = [];

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Posts konden niet geladen worden');
        }
        return response.json();
    })
    .then(function (posts) {
        allePosts = posts;
        toonPosts();
    })
    .catch(function () {
        postsContainer.innerHTML = '<div class="error">De posts konden niet geladen worden.</div>';
    });

toepassenKnop.addEventListener('click', function () {
    toonPosts();
});

function toonPosts() {
    const zoekterm = zoektermInput.value.toLowerCase();
    const sorteer = sorteerSelect.value;
    const limiet = Number(limietSelect.value);

    let posts = allePosts.filter(function (post) {
        return post.title.toLowerCase().includes(zoekterm);
    });

    posts.sort(function (a, b) {
        if (sorteer === 'titel-oplopend') return a.title.localeCompare(b.title);
        if (sorteer === 'titel-aflopend') return b.title.localeCompare(a.title);
        if (sorteer === 'id-oplopend') return a.id - b.id;
        if (sorteer === 'id-aflopend') return b.id - a.id;
    });

    posts = posts.slice(0, limiet);
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="geen-resultaten">Geen posts gevonden</div>';
        return;
    }

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        let korteTekst = post.body;

        if (korteTekst.length > 100) {
            korteTekst = korteTekst.substring(0, 100) + '...';
        }

        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML =
            '<div class="post-titel">' + post.title.toUpperCase() + '</div>' +
            '<div class="post-body">' + korteTekst + '</div>' +
            '<div class="post-info"><span>Post ID: ' + post.id + '</span><span>Gebruiker ID: ' + post.userId + '</span></div>';

        postsContainer.appendChild(div);
    }
}
