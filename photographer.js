const modalContact = document.querySelector(".modal-body");
let modalMessage = document.getElementById("modal-message");

async function photographerPage() {
  const res = await fetch("/api/FishEyeData.json");
  const data = await res.json();

  const photog = new URLSearchParams(window.location.search);
  const queryPhotographerId = parseInt(photog.getAll("id")[0]);
  let tags = new Set();

  data.photographers.forEach((photo) => {
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

      photo.tags.forEach((tag) => {
        tags.add(tag);

        const photographerPageTag = document.createElement("a");
        photographerPageTag.setAttribute("href", "#");

        let photographerPageSpanTag = document.createElement("span");
        photographerPageSpanTag.append("#" + tag);

        photographerPageTag.appendChild(photographerPageSpanTag);
        photographerPageDivTag.appendChild(photographerPageTag);
      });

      const photographerPageButton = document.createElement("button");
      photographerPageButton.setAttribute("class", "open");
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
      photographerPagePrice.innerHTML = photo.price + "€ / jour";

      const modalContact = document.querySelector(".modal-body");
      const modalDivName = document.createElement("div");
      modalDivName.setAttribute("id", "modal-name");
      modalDivName.innerHTML = "Contactez-moi" + " " + photo.name;

      modalContact.before(modalDivName);
    }
  });

  const bodystyle = document.querySelector("body");
  const modalBtn = document.querySelector(".open");
  const modalbg = document.querySelector(".bground");
  const close = document.getElementById("close");
  const modalName = document.getElementById("modal-name");

  // Launch modal
  modalBtn.addEventListener("click", launchModal);

  function launchModal() {
    modalbg.style.display = "block";
    bodystyle.style.position = "fixed";
    document.getElementById("sectionForm").className = "sectionFormOpen";
    document.getElementById("modal-name").style.display = "block";
    document.getElementById("modal-message").style.display = "none";
  }

  // Close modal
  function closeModal() {
    modalbg.style.display = "none";
    bodystyle.style.position = "relative";
  }

  close.addEventListener("click", closeModal);
}
photographerPage();

////
async function photographerPageWork() {
  const res = await fetch("/api/FishEyeData.json");
  const data = await res.json();
  const photog = new URLSearchParams(window.location.search);
  const queryPhotographerId = parseInt(photog.getAll("id")[0]);
  let sumLike = 0;

  data.media.forEach((medias) => {
    ////section work

    if (medias.photographerId === queryPhotographerId) {
      sumLike += medias.likes;

      const photographerPageBoxListImage = document.querySelector(".box-list");

      // video
      const photographerPageVideoDiv = document.createElement("div");
      photographerPageVideoDiv.setAttribute("class", "presentation-video");

      const photographerPageVideoPTitle = document.createElement("p");
      photographerPageVideoPTitle.innerHTML = `${medias.title}`;

      const photographerPageVideoSpanLike = document.createElement("span");
      photographerPageVideoSpanLike.innerHTML = `${medias.likes} <i class="fas fa-heart"></i>`;

      photographerPageVideoDiv.appendChild(photographerPageVideoPTitle);
      photographerPageVideoDiv.appendChild(photographerPageVideoSpanLike);

      if (medias.video !== undefined) {
        const photographerDivMediaVideo = document.createElement("div");
        photographerDivMediaVideo.setAttribute("class", "media-video");

        const photographerVideo = document.createElement("video");
        photographerVideo.setAttribute("id", "video");

        const photographerVideoSource = document.createElement("source");
        photographerVideoSource.setAttribute("type", "video/mp4");
        photographerVideoSource.setAttribute(
          "src",

          `/Sample_Photos/${medias.photographerId}/${medias.video}`
        );

        photographerPageBoxListImage.appendChild(photographerDivMediaVideo);
        photographerVideo.appendChild(photographerVideoSource);
        photographerDivMediaVideo.insertBefore(photographerVideo, null);
        photographerDivMediaVideo.appendChild(photographerPageVideoDiv);
      }

      // Image

      const photographerPresentationImage = document.createElement("div");
      photographerPresentationImage.setAttribute("class", "presentation-photo");

      const photographerPageImagePTitle = document.createElement("p");
      photographerPageImagePTitle.innerHTML = `${medias.title}`;

      const photographerPageImageSpanLike = document.createElement("span");
      photographerPageImageSpanLike.innerHTML = `${medias.likes} <i class="fas fa-heart"></i>`;

      photographerPresentationImage.appendChild(photographerPageImagePTitle);
      photographerPresentationImage.appendChild(photographerPageImageSpanLike);

      if (medias.image !== undefined) {
        const photographerDivMediaImage = document.createElement("div");
        photographerDivMediaImage.setAttribute("class", "media-image");

        const photographerImage = document.createElement("img");
        photographerImage.setAttribute(
          "src",
          `/Sample_photos/${medias.photographerId}/${medias.image}`
        );
        photographerImage.setAttribute("alt", "");
        photographerImage.setAttribute("class", "image-photographerBox");

        photographerPageBoxListImage.appendChild(photographerDivMediaImage);
        photographerDivMediaImage.appendChild(photographerImage);
        photographerDivMediaImage.appendChild(photographerPresentationImage);
      }
    }

    /*
        const photographerPageVideoDiv = document.createElement("div");
        photographerPageVideoDiv.setAttribute("class", "presentation-video");

        const photographerPageVideoPTitle = document.createElement("p");
        photographerPageVideoPTitle.innerHTML = `${medias.title}`;

        const photographerPageVideoSpanLike = document.createElement("span");
        photographerPageVideoSpanLike.innerHTML = `${medias.likes} <i class="fas fa-heart"></i>`;

        photographerPageBoxAVideo.appendChild(photographerPageVideoDiv);
        photographerPageVideoDiv.appendChild(photographerPageVideoPTitle);
        photographerPageVideoDiv.appendChild(photographerPageVideoSpanLike);
      }

      console.log(typeof medias.video);
      photographerPageBoxListImage.append(photographerPageBoxLiImage);
      photographerPageBoxLiImage.appendChild(photographerPageBoxAImage);
    }*/
  });
  const photographerPageDivLike = document.querySelector(".totalLike");
  photographerPageDivLike.innerHTML = `${sumLike} <i class="fas fa-heart"></i>`;
}
photographerPageWork();

// Validation modal-contact

const form = document.getElementById("sectionForm");

function addError(label, message) {
  document.getElementById(label).style.border = "2px solid red";
  document.getElementById(`${label}Error`).textContent = message;
}

function removeError(label) {
  document.getElementById(label).style.border = "none";
  document.getElementById(`${label}Error`).textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const modalText = document.getElementById("modal-name");
  const emailRegex =
    /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
  let error = false;

  if (firstName.value.length < 2) {
    addError("first", "Veuillez entrer 2 caractères minimum");
    error = true;
  } else {
    removeError("first");
  }

  if (lastName.value.length < 2) {
    addError("last", "Veuillez entrer 2 caractères minimum");
    error = true;
  } else {
    removeError("last");
  }

  if (!email.value.match(emailRegex)) {
    addError("email", "Veuillez entrer un email valide");
    error = true;
  } else {
    removeError("email");
  }

  if (!error) {
    console.log("modal-name");
    document.getElementById("modal-name").style.display = "none";

    document.getElementById("sectionForm").className = "sectionFormClose";
    document.getElementById("modal-message").style.display = "block";
    document.getElementById("modal-message").innerHTML =
      "Votre message a bien été envoyé !";
  }
});
