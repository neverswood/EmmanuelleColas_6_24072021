async function photographerPage() {
    //const res = await fetch("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json");
    //we can't fetch the file directly from aws because of CORS policy
    const res = await fetch("/api/FishEyeData.json");
    const data = await res.json();
    console.log(data);
    data.photographers.forEach( photo => {

        const photographerPageSection = document.getElementById("presentation-photographer");
        const photographerPageDiv = document.createElement("div");

        const photographerPageH1 = document.createElement("h1");
        photographerPageH1.innerHTML = photo.name;

        const photographerPageH2 = document.createElement("h2");
        photographerPageH2.innerHTML = photo.city + "," + " " + photo.country;

        const photographerPageP = document.createElement("p");
        photographerPageP.innerHTML = photo.tagline;

        const photographerPageSpan = document.createElement("span");
        photographerPageSpan.innerHTML = photo.price + "€/jour";

        const photographerPageButton = document.createElement("button");
        photographerPageButton.innerHTML = "Contactez-moi";

        const photographerPageImage = document.createElement("img");
        photographerPageImage.setAttribute("src", `/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}`);
        photographerPageImage.setAttribute("alt", "");



        photographerPageDiv.appendChild(photographerPageH1);
        photographerPageDiv.appendChild(photographerPageH2);
        photographerPageDiv.appendChild(photographerPageP);
        photographerPageDiv.appendChild(photographerPageSpan);
        photographerPageSection.appendChild(photographerPageDiv);
        photographerPageSection.appendChild(photographerPageButton);
        photographerPageSection.appendChild(photographerPageImage);



    });
};