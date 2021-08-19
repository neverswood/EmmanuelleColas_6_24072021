async function photographerPage() {
  //const res = await fetch("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json");
  //we can't fetch the file directly from aws because of CORS policy
  const res = await fetch("/api/FishEyeData.json");
  const data = await res.json();

  const photog = new URLSearchParams(window.location.search);
  const queryPhotographerId = parseInt(photog.getAll("id")[0]);
  let tags = new Set();

  data.photographers.forEach((photo) => {
    ///
    photo.tags.forEach((tag) => {
      tags.add(tag);
    });

    //////
    if (photo.id == queryPhotographerId) {
      const photographerPageSection = document.getElementById(
        "presentation-photographer"
      );
      const photographerPageDiv = document.createElement("div");

      const photographerPageH1 = document.createElement("h1");
      photographerPageH1.setAttribute("class", "photographer-name");
      photographerPageH1.innerHTML = photo.name;

      const photographerPageH2 = document.createElement("h2");
      photographerPageH2.innerHTML = photo.city + "," + " " + photo.country;

      const photographerPageP = document.createElement("p");
      photographerPageP.innerHTML = photo.tagline;

      const photographerPageDivTag = document.createElement("div");
      photographerPageDivTag.setAttribute("class", "photographerPage-tag");

      const photographerPageButton = document.createElement("button");
      photographerPageButton.setAttribute("class", "open");
      photographerPageButton.setAttribute("id", "toto");
      photographerPageButton.innerHTML = "Contactez-moi";

      const photographerPageImage = document.createElement("img");
      photographerPageImage.setAttribute(
        "src",
        `/Sample_Photos/Photographers_ID_Photos/${photo.portrait}`
      );
      photographerPageImage.setAttribute("alt", "");
      photographerPageImage.setAttribute("class", "image-photographer");

      photographerPageDiv.appendChild(photographerPageH1);
      photographerPageDiv.appendChild(photographerPageH2);
      photographerPageDiv.appendChild(photographerPageP);
      photographerPageDiv.appendChild(photographerPageDivTag);
      photographerPageSection.appendChild(photographerPageDiv);
      photographerPageSection.appendChild(photographerPageButton);
      photographerPageSection.appendChild(photographerPageImage);

      ////

      const photographerSectionWork =
        document.getElementById("work-photographer");
      const photographerDivSorting = document.querySelector(".sorting");

      const photographerPageLabel = document.createElement("label");
      photographerPageLabel.setAttribute("for", "sorting");
      photographerPageLabel.innerHTML = "Trier par";

      const photographerPageSelect = document.createElement("select");
      photographerPageSelect.setAttribute("id", "sorting");
      photographerPageSelect.setAttribute("name", "sorting");

      const photographerPageOption1 = document.createElement("option");
      photographerPageOption1.setAttribute("value", "popularity");
      photographerPageOption1.innerHTML = "Popularité";

      const photographerPageOption2 = document.createElement("option");
      photographerPageOption2.setAttribute("value", "date");
      photographerPageOption2.innerHTML = "Date";

      const photographerPageOption3 = document.createElement("option");
      photographerPageOption3.setAttribute("value", "title");
      photographerPageOption3.innerHTML = "Titre";

      photographerDivSorting.appendChild(photographerPageLabel);
      photographerPageSelect.appendChild(photographerPageOption1);
      photographerPageSelect.appendChild(photographerPageOption2);
      photographerPageSelect.appendChild(photographerPageOption3);
      photographerDivSorting.appendChild(photographerPageSelect);

      const photographerPagePrice = document.querySelector(".price");
      photographerPagePrice.innerHTML = `${photo.price}€ / jour`;
      console.log(photographerPagePrice);

      //photographerPageDivLike.appendChild(photographerPagePrice);

      ///

      tags.forEach((tag) => {
        const photographerPageTag = document.createElement("a");
        photographerPageTag.setAttribute("href", "#");

        let photographerPageSpanTag = document.createElement("span");
        photographerPageSpanTag.append("#" + tag);

        photographerPageTag.appendChild(photographerPageSpanTag);
        photographerPageDivTag.appendChild(photographerPageTag);
      });
    }
  });

  const modalBtn = document.querySelector(".open");
  const modalbg = document.querySelector("#modal-photographer");

  modalBtn.addEventListener("click", launchModal);

  function launchModal() {
    modalbg.style.display = "block";
    //modalbg.className = "show-modal";
    console.log("lol");
  }
}
photographerPage();
/* const modalContent = document.querySelector(".content");
        const modalH1 = document.createElement("h1");
        modalH1.innerHTML = `Contactez-moi ${photo.Id}`;

        modalContent.appendChild(modalH1);*/

async function photographerPageWork() {
  //const res = await fetch("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json");
  //we can't fetch the file directly from aws because of CORS policy
  const res = await fetch("/api/FishEyeData.json");
  const data = await res.json();
  const photog = new URLSearchParams(window.location.search);
  const queryPhotographerId = parseInt(photog.getAll("id")[0]);
  let sumLike = 0;

  data.media.forEach((medias) => {
    ////section work

    if (medias.photographerId == queryPhotographerId) {
      sumLike += medias.likes;

      const photographerDivBox = document.querySelector(".box");

      const photographerPagePhotoLink = document.createElement("a");
      photographerPagePhotoLink.setAttribute("href", "modal");

      const photographerPageImageBox = document.createElement("img");
      photographerPageImageBox.setAttribute(
        "src",
        `/Sample_Photos/${medias.photographerId}/${medias.image}`
      );
      photographerPageImageBox.setAttribute("alt", "");
      photographerPageImageBox.setAttribute("class", "image-photographerBox");

      const photographerPageImageDiv = document.createElement("div");
      photographerPageImageDiv.setAttribute("class", "presentation-photo");

      const photographerPageImagePTitle = document.createElement("p");
      photographerPageImagePTitle.innerHTML = `${medias.title}`;

      const photographerPageImageSpanLike = document.createElement("span");
      photographerPageImageSpanLike.innerHTML = `${medias.likes} <i class="fas fa-heart"></i>`;

      photographerPageImageDiv.appendChild(photographerPageImagePTitle);
      photographerPageImageDiv.appendChild(photographerPageImageSpanLike);
      photographerPagePhotoLink.appendChild(photographerPageImageBox);
      photographerPagePhotoLink.appendChild(photographerPageImageDiv);
      photographerDivBox.append(photographerPagePhotoLink);

      ///lauch modal
    }
  });
  /*data.media.Map =*/
  const photographerPageDivLike = document.querySelector(".likes");

  photographerPageDivLike.innerHTML = `${sumLike}`;
}
photographerPageWork();

console.log("tata");

//console.log(launchModal());
