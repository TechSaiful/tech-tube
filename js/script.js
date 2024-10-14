
// category button show in front
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => showCategories(data.categories))
        .catch((err) => console.log(err));
}
loadCategories();


const loadVideosByCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json() )
    .then((data) => showVideos(data.category))
    .catch((err) => console.log(err));
}

const showCategories = (categories) => {
    let categoryContainer = document.getElementById('category_container');
    for (const category of categories) {
        let categoryButtonContainer = document.createElement('div');
        categoryButtonContainer.innerHTML = `
        <button onclick="loadVideosByCategory(${category.category_id})" class="btn">
            ${category.category}
        </button>
        `
        categoryContainer.appendChild(categoryButtonContainer);
    }
}



// video show in front like card by API
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => showVideos(data.videos))
        // .then((data) => console.log(data.videos))
        .catch((err) => console.log(err));
}
loadVideos();

// video time calculation
function videoTimeSet(time){
    let hour = parseInt(time /3600);
    let remainingSec = time % 3600;
    let minute = parseInt(remainingSec / 60);
    return `${hour} : ${minute}`;
}



// {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }

const showVideos = (videos) => {
    let videoContainer = document.getElementById('video_container');
    videoContainer.innerHTML = '';

    if(videos.length == 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class="min-h-screen flex flex-col justify-center items-center gap-4">
                <img src="images/icon.png">
                <h2 class="font-bold text-black text-xl">No content here in this category.</h2>
            </div>
        `
        return;
    }
    else{
        videoContainer.classList.add = 'grid';
    }

    for (const video of videos) {
        let card = document.createElement('div');
        card.classList = 'card shadow-xl';
        card.innerHTML = `
        <figure class="relative">
            <img class="lg:h-[250px] w-full h-auto object-cover" src="${video.thumbnail}" alt="Shoes" />
            ${video.others.posted_date.length == 0 ? "": `<span class="absolute right-1 bottom-1 p-2 rounded-sm bg-slate-900 text-white">${videoTimeSet(video.others.posted_date)}</span>`}
            
        </figure>
        <div class="px-0 py-4">
            <div class="flex gap-4">
                <div class=""><img class="h-8 w-8 rounded-full object-cover" src="${video.authors[0].profile_picture}" /></div>
                <div class="">
                    <h2 class="font-bold text-lg">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p>${video.authors[0].profile_name}</p>
                        ${ video.authors[0].verified == true ? '<img class="h-4 w-4" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" />' : ' ' }
                        
                    </div>
                    <p>${video.others.views} views</p>
                </div>
            </div>
        </div>
        `
        videoContainer.appendChild(card);
    }

}







