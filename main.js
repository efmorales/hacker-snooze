
let body = document.querySelector('body');
let topStoriesSection = document.querySelector(".topStories")

let askSection = document.querySelector(".askSection");


let topStoriesArray = [];

let topNewsIdAPI = async () => {

    let response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")

    // console.log(response);

    let data = await response.json();

    // console.log(data.length);

    for (let i = 0; i < 100; i++) {
        topStoriesArray.push(data[i]);
        hackerNewsItemAPI(i);

    }

    // console.log(topStoriesArray);

}

topNewsIdAPI();

let hackerNewsItemAPI = async (i) => {

    let request = await fetch(`https://hacker-news.firebaseio.com/v0/item/${topStoriesArray[i]}.json?print=pretty`);

    // console.log(request);

    let response = await request.json();

    let grandparent = document.createElement('div');
    grandparent.className = `container-md grandparent grandparent${i} card`;
    let parent = document.createElement('a');
    parent.className = `parent parent${i} card-title`;
    let child = document.createElement('a');
    child.className = `child child${i} card-text`;

    grandparent.appendChild(parent);
    grandparent.appendChild(child);
    topStoriesSection.appendChild(grandparent);

    parent.innerText = `${response.score} points - ${response.title}`;
    parent.href = response.url;
    // "230 points - Story title goes here";
    child.innerText = `${response.descendants} comments - submitted by ${response.by}`;
    child.href = `https://news.ycombinator.com/item?id=${topStoriesArray[i]}`;

    // "20 comments - submitted by username";
    // https://news.ycombinator.com/item?id=${topStoriesArray[i]}
    // console.log(response.score);
    // console.log(response.title);
    // console.log(response.url);
    // console.log(response.descendants);
    // console.log(response.by);
    // console.log(response.kids);

    for (let i = 0; i < 1; i++) {
        
        fetch (`https://hacker-news.firebaseio.com/v0/item/${response.kids[i]}.json?print=pretty`)

            .then((r) => {
                return r.json();
             })
            .then ((data) => {

                let grandchildren = document.createElement('div');
                grandchildren.className = `accordion grandchildren${i} card`;
                grandchildren.setAttribute("id", "accordionExample");   

                let accItemDiv = document.createElement('div');
                accItemDiv.className = 'accordion-item';

                let gcH2 = document.createElement('h2');
                gcH2.className = `accordion-header`;
                gcH2.setAttribute("id", "headingOne");

                let gcButton = document.createElement('button');
                gcButton.className = `accordion-button`
                gcButton.setAttribute("type", "button");
                gcButton.setAttribute("data-bs-toggle", "collapse");
                gcButton.setAttribute("data-bs-target", "#collapseOne");
                gcButton.setAttribute("aria-controls", "collapseOne");
                gcButton.setAttribute("type", "button");
                gcButton.innerText = "Top comment";

                let gcDiv = document.createElement('div');
                gcDiv.className = `accordion-collapse collapse show`
                gcDiv.setAttribute("id", "collapseOne");
                gcDiv.setAttribute("aria-labelledby", "headingOne");
                gcDiv.setAttribute("data-bs-parent", "#accordionExample");

                let gcText = document.createElement("div");
                gcText.className = 'accordion-body';
                gcText.innerHTML = `By user ${data.by}: ${data.text}`

                grandparent.appendChild(grandchildren);
                grandchildren.appendChild(accItemDiv);
                accItemDiv.appendChild(gcH2);
                gcH2.appendChild(gcButton);
                grandchildren.appendChild(gcDiv);
                gcDiv.appendChild(gcText);

            } )
       
    }

}

let askSectionClick = document.querySelector(".ask")

askSectionClick.addEventListener("click",() => {

    askAPI();
    topStoriesSection.classList.add("invisible");
    askSection.classList.remove("invisible");
    
})

let storiesSectionClick = document.querySelector(".stories");

storiesSectionClick.addEventListener("click", () => {

    askSection.classList.add("invisible");
    topStoriesSection.classList.remove("invisible");
 
})

let askAPI = async () => {
        
    let response = await fetch('https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty');
    
    let data = await (response.json());
    
    

    for (let i = 0; i < data.length; i++) {
        
        fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`)

            .then((r) => {
                return r.json();
            })
            .then ((data) => {


                // console.log(data);
                // askSection.appendChild();

                //data.score
                //data.title

                //data.by
                //data.descendants
                //data.text

                //data.id

                let grandparent = document.createElement('div');
                grandparent.className = `container-md grandparent grandparent${i} card`;
                let parent = document.createElement('div');
                parent.className = `parent parent${i} card-title`;
                let child = document.createElement('a');
                child.className = `child child${i} card-text`;
                let askText = document.createElement('p');
                askText.className = `askText`

                grandparent.appendChild(parent);
                grandparent.appendChild(child);
                grandparent.appendChild(askText);
                askSection.appendChild(grandparent);

                parent.innerText = `${data.score} points - ${data.title}`;
                // "230 points - Story title goes here";
                child.innerText = `${data.descendants} comments - submitted by ${data.by}`;
                child.href = `https://news.ycombinator.com/item?id=${data.id}`;

                askText.innerHTML = `${data.text}`
                
            })

    }
    
    
    
}

// 33644336
// (`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`)