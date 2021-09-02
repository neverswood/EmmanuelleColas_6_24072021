/// DOM Elements

const bodystyle = document.querySelector("body");
const photographerDivSorting = document.querySelector(".sorting");

const modalbg = document.querySelector(".bground");
const close = document.getElementById("close");
const modalName = document.getElementById("modal-name");
const photographerPageBoxList = document.querySelector(".box-list");

const carouselSection = document.getElementById("carousel");
const carouselDiv = document.getElementById("carousel__div");
const carouselOl = document.querySelector(".carousel__viewport");

const modalContact = document.querySelector(".modal-body");
let modalMessage = document.getElementById("modal-message");

///////////////////////////////////////////////////////////////////////////

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
  const modalBtn = document.querySelector(".open");

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

///////////////////////////////// Function with Json media ///////////////////////
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
      let mediasLikes = medias.likes;
      let likeElement = null;

      function incrementLike() {
        mediasLikes++;
        likeElement.innerHTML = `${mediasLikes} <i class="fas fa-heart" class="like"></i>`;
      }

      if (medias.video !== undefined) {
        const photographerDivMediaVideo = document.createElement("div");
        photographerDivMediaVideo.setAttribute("class", "media-video");
        ////lolll
        const photographerVideo = document.createElement("video");
        photographerVideo.setAttribute("id", "video");

        const photographerVideoSource = document.createElement("source");
        photographerVideoSource.setAttribute("type", "video/mp4");
        photographerVideoSource.setAttribute(
          "src",

          `/Sample_Photos/${medias.photographerId}/${medias.video}`
        );
        photographerVideo.appendChild(photographerVideoSource);

        let [mediaPresentationElement, mediaLike] =
          createMediaPresentationElement("presentation-video", medias);
        likeElement = mediaLike;

        mediaLike.addEventListener("click", incrementLike);
        photographerDivMediaVideo.appendChild(photographerVideo);
        photographerDivMediaVideo.appendChild(mediaPresentationElement);
        photographerPageBoxList.appendChild(photographerDivMediaVideo);
      }

      // Image

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

        let [mediaPresentationElement, mediaLike] =
          createMediaPresentationElement("presentation-photo", medias);
        likeElement = mediaLike;

        mediaLike.addEventListener("click", incrementLike);

        photographerDivMediaImage.appendChild(photographerImage);
        photographerDivMediaImage.appendChild(mediaPresentationElement);
        photographerPageBoxList.appendChild(photographerDivMediaImage);

        ///
      }

      //// Modal Carousel
      if (medias.image !== undefined) {
        const carouselLi = document.createElement("li");
        carouselLi.setAttribute("id", "carousel__slide");
        carouselLi.setAttribute("class", "carousel__slide");
        carouselLi.setAttribute("tabindex", "0");

        const carouselDivSnapper = document.createElement("div");
        carouselDivSnapper.setAttribute("class", "carousel__snapper");

        const carouselSlideLast = document.createElement("a");
        carouselSlideLast.setAttribute("href", "#carousel__last");
        carouselSlideLast.setAttribute("class", "carousel__last");
        carouselSlideLast.innerHTML = `<i class="arrow"></i>`;

        const carouselSlideRight = document.createElement("a");
        carouselSlideRight.setAttribute("href", "#carousel__next");
        carouselSlideRight.setAttribute("class", "carousel__next");
        carouselSlideRight.innerHTML = `<i class="arrow"></i>`;

        const imageCarousel = document.createElement("img");
        imageCarousel.setAttribute("id", "mediaCarousel");
        imageCarousel.innerHTML = `${medias.image}`;

        carouselOl.appendChild(carouselLi);
        carouselLi.appendChild(carouselDivSnapper);
        carouselDivSnapper.appendChild(carouselSlideLast);
        carouselDivSnapper.appendChild(imageCarousel);
        carouselDivSnapper.appendChild(carouselSlideRight);
      }
    }
  });
  const photographerPageDivLike = document.querySelector(".totalLike");
  photographerPageDivLike.innerHTML = `${sumLike} <i class="fas fa-heart"></i>`;

  const mediaGallery = document.querySelectorAll(".image-photographerBox");

  function launchCarousel() {
    carouselSection.style.display = "block";
    bodystyle.style.position = "fixed";
  }
  mediaGallery.forEach((img) => img.addEventListener("click", launchCarousel));
}

function createMediaPresentationElement(className, medias) {
  const mediaPresentation = document.createElement("div");
  mediaPresentation.setAttribute("class", className);

  const mediaPresentationChild = document.createElement("div");
  mediaPresentationChild.setAttribute("class", "child-presentation");

  const mediaTitle = document.createElement("p");
  mediaTitle.innerHTML = `${medias.title}`;

  const mediaDate = document.createElement("span");
  mediaDate.setAttribute("class", "date");
  mediaDate.innerHTML = `${medias.date}`;

  const mediaPrice = document.createElement("span");
  mediaPrice.setAttribute("class", "date");
  mediaPrice.innerHTML = `${medias.price}€`;

  const mediaLike = document.createElement("span");
  mediaLike.innerHTML = `${medias.likes} <i class="fas fa-heart" class="like"></i>`;

  mediaPresentation.appendChild(mediaPresentationChild);
  mediaPresentation.appendChild(mediaLike);
  mediaPresentationChild.appendChild(mediaTitle);
  mediaPresentationChild.appendChild(mediaDate);
  mediaPresentationChild.appendChild(mediaPrice);

  return [mediaPresentation, mediaLike];
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
