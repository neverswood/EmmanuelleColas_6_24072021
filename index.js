// Index Page
//faire le passer au contenu. invisible ,qui apparait au scroll et qui remonte en haut de la page quand on click dessus.



async function photographerPageIndex() {
    //const res = await fetch("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json");
    //we can't fetch the file directly from aws because of CORS policy
    const res = await fetch("/api/FishEyeData.json");
    const data = await res.json();
    console.log(data);
    let tags = new Set();
    data.photographers.forEach( photographer => {

       photographer.tags.forEach(tag => {
            tags.add(tag);

        });

        const photographersContainer = document.getElementById("photographers");
        const photographerSection = document.createElement("section");
        photographerSection.setAttribute("class", "photographer");
        photographerSection.setAttribute("aria-label", "photographer link");

        const photographerLink = document.createElement("a");
        photographerLink.setAttribute("href", `/photographer.html?id=${photographer.id}`);

        const photographerImage = document.createElement("img");
        photographerImage.setAttribute("src", `/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}`);
        photographerImage.setAttribute("alt", "");

        const photographerH2 = document.createElement("h2");
        photographerH2.innerHTML = photographer.name;

        const photographerDivPresentation = document.createElement("div");
        photographerDivPresentation.setAttribute("class", "photgrapher_presentation");

        const photographerH3 = document.createElement("h3");
        photographerH3.innerHTML = photographer.city + "," + " " + photographer.country;

        const photographerP = document.createElement("p");
        photographerP.innerHTML = photographer.tagline;

        const photographerSpan = document.createElement("span");
        photographerSpan.innerHTML = photographer.price + "€/jour";

        const photographerDivTag = document.createElement("div");
        photographerDivTag.setAttribute("class", "photographer_tag");

        const photographerTag = document.createElement("a");
        photographerTag.setAttribute("href", "#");
        photographerTag.setAttribute("id", photographer.tags);


        photographerDivTag.appendChild(photographerTag);
        photographerSection.appendChild(photographerDivTag);
        photographerDivPresentation.appendChild(photographerH3);
        photographerDivPresentation.appendChild(photographerP);
        photographerDivPresentation.appendChild(photographerSpan);
        photographerLink.appendChild(photographerImage);
        photographerLink.appendChild(photographerH2);
        photographerSection.appendChild(photographerLink);
        photographerSection.appendChild(photographerDivPresentation);
        photographersContainer.appendChild(photographerSection);

    });
    
    tags.forEach( tag => {

        const navBarContainer = document.querySelector("header");
        const navBarDiv = document.getElementById("header-navbar");
        let navBarA = document.createElement("a");
        navBarA.setAttribute("href", "#");
        navBarA.setAttribute("id", "header-navbar-link");

        let navBarSpan = document.createElement("span");
        navBarSpan.append("#" + tag);
        navBarA.appendChild(navBarSpan);
        navBarDiv.appendChild(navBarA);
        navBarContainer.appendChild(navBarDiv);
        console.log(navBarA)


        console.log(navBarSpan)


    })
}

photographerPageIndex();

// Photographers Pages


