
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
    .then((data) => {
        // remove active class form all button
        removeActive();
        // add active class to button
        let activeButton = document.getElementById(`btn_${id}`);
        activeButton.classList.add("active-category-btn");
        showVideos(data.category)
    })
    .catch((err) => console.log(err));
}

// show category button
const showCategories = (categories) => {
    let categoryContainer = document.getElementById('category_container');
    for (const category of categories) {
        let categoryButtonContainer = document.createElement('div');
        categoryButtonContainer.innerHTML = `
        <button id="btn_${category.category_id}" onclick="loadVideosByCategory(${category.category_id})" class="btn category-button">
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

// video details fetch
const loadVideoDetails = async (videoId) => {
    let uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    let res = await fetch(uri);
    let data = await res.json();
    showVideoDetails(data.video);
    console.log(data.video);
}


// video time calculation function
function videoTimeSet(time){
    let hour = parseInt(time /3600);
    let remainingSec = time % 3600;
    let minute = parseInt(remainingSec / 60);
    return `${hour} : ${minute}`;
}

// active class remove function
const removeActive = () => {
    let button = document.getElementsByClassName('category-button');
    for( btn of button){
        btn.classList.remove('active-category-btn');
    }
}

// video details view function
const showVideoDetails = (video) => {
    console.log(video);
    let modalContent = document.getElementById('modal_content');
    modalContent.innerHTML = `
        <img src=${video.thumbnail} />
        <p>${video.description}</p>
    
    `;

    document.getElementById("video_details_modal").showModal();
}


const showVideos = (videos) => {
    let videoContainer = document.getElementById('video_container');
    videoContainer.innerHTML = '';

    // conditional grid for null category page
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
                <div class="w-full">
                    <h2 class="font-bold text-lg">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p>${video.authors[0].profile_name}</p>
                        ${ video.authors[0].verified == true ? '<img class="h-4 w-4" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" />' : ' ' }
                        
                    </div>
                    <div class="flex justify-between">
                        <p>${video.others.views} views</p>
                        <p class="mr-6"><button onClick="loadVideoDetails('${video.video_id}')" class="bg-orange-500 py-1 px-4 font-bold rounded-md">view</button></p>
                    </div>
                </div>
            </div>
        </div>
        `
        videoContainer.appendChild(card);
    }

}







