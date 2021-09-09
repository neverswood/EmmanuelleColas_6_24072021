////////

const returnMain = document.getElementById("return-main");
let home = document.getElementById("home");

/// launch div return-main
function launchReturnMain() {
  returnMain.style.display = "block";
}

home.addEventListener("wheel", launchReturnMain);
returnMain.addEventListener("click", home);

///

async function photographerPageIndex() {
  //const res = await fetch("https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json");
  //we can't fetch the file directly from aws because of CORS policy
  const res = await fetch("/api/FishEyeData.json");
  const data = await res.json();
  let tags = new Set();
  const filterTag = new URLSearchParams(window.location.search);
  const queryPhotographerId = parseInt(filterTag.getAll("#")[0]); //mettre pour filtre
  let tagother = 0;

  data.photographers.forEach((photographer) => {
    let activeTagsArray = [];

    // Toggling the 'active-tag' and filtering relevant photographers
    function filterPhotographers(element) {
      element.addEventListener("click", () => {
        const allSimilarTags = document.querySelectorAll(
          `.tag[data-tag-name="${element.dataset.tagName}"]`
        );
        console.log(tagName);

        element.blur();

        // If a tag is active, all of its siblings (i.e duplicates) become active as well
        if (element.classList.contains("active-tag")) {
          allSimilarTags.forEach((similarTag) => {
            similarTag.classList.remove("active-tag");
          });
          activeTagsArray = activeTagsArray.filter(
            (tag) => !(tag === element.dataset.tagName)
          );
        } else {
          allSimilarTags.forEach((similarTag) => {
            similarTag.classList.add("active-tag");
          });
          activeTagsArray.push(element.dataset.tagName);
        }

        // If no tag has been selected, show all photographers
        if (activeTagsArray.length <= 0) {
          const elementsToDisplay = document.querySelectorAll("photographers");
          elementsToDisplay.forEach((elementToDisplay) => {
            elementToDisplay.classList.remove("hidden");
          });
          return;
        }

        // Sections are hidden, only to be shown when a relevant tag has been selected
        const sections = document.querySelectorAll("photographers");
        sections.forEach((section) => {
          section.classList.add("hidden");
        });

        // If a tag has a sister tag in the active array, his section parent is displayed
        activeTagsArray.forEach((tag) => {
          const elementsToDisplay = document.querySelectorAll(
            `photographers[data-tags*="${tag}"]`
          );
          elementsToDisplay.forEach((elementToDisplay) => {
            elementToDisplay.classList.remove("hidden");
          });
        });
      });
    }

    const tagsNav = document.querySelectorAll(".tag");
    tagsNav.forEach((tag) => {
      filterPhotographers(tag);
    });

    if (photographer.tag == queryPhotographerId) {
    }
    const photographersContainer = document.getElementById("photographers");

    const photographerSection = document.createElement("section");
    photographerSection.setAttribute("class", "photographer");
    photographerSection.setAttribute("aria-label", "photographer link");

    const photographerLink = document.createElement("a");
    photographerLink.setAttribute(
      "href",
      `/photographer.html?id=${photographer.id}`
    );

    const photographerImage = document.createElement("img");
    photographerImage.setAttribute(
      "src",
      `/Sample_Photos/Photographers_ID_Photos/${photographer.portrait}`
    );
    photographerImage.setAttribute("alt", "");

    const photographerH2 = document.createElement("h2");
    photographerH2.innerHTML = photographer.name;

    const photographerDivPresentation = document.createElement("div");
    photographerDivPresentation.setAttribute(
      "class",
      "photographer_presentation"
    );

    const photographerH3 = document.createElement("h3");
    photographerH3.innerHTML =
      photographer.city + "," + " " + photographer.country;

    const photographerP = document.createElement("p");
    photographerP.innerHTML = photographer.tagline;

    const photographerSpan = document.createElement("span");
    photographerSpan.innerHTML = photographer.price + "€/jour";

    const photographerDivTag = document.createElement("div");
    photographerDivTag.setAttribute("class", "photographer-tag");

    photographerDivPresentation.appendChild(photographerH3);
    photographerDivPresentation.appendChild(photographerP);
    photographerDivPresentation.appendChild(photographerSpan);
    photographerDivPresentation.appendChild(photographerDivTag);
    photographerLink.appendChild(photographerImage);
    photographerLink.appendChild(photographerH2);
    photographerSection.appendChild(photographerLink);
    photographerSection.appendChild(photographerDivPresentation);
    photographersContainer.appendChild(photographerSection);

    //const photographerfilter = document.getElementById("photographer");

    photographer.tags.forEach((tag) => {
      tags.add(tag);

      const photographerTag = document.createElement("a");
      photographerTag.setAttribute("href", "#");

      let photographerSpanTag = document.createElement("span");
      photographerSpanTag.append("#" + tag);

      photographerTag.append(photographerSpanTag);
      photographerDivTag.append(photographerTag);
    });
    // const tags = photographer.tags;
    /*
    function sortPhotographer(el) {
      if (el.tags === photographer.tags) {
        return true;
      } else {
        tagother++;
        return false;
      }
    }
    let phototag = photographer.tags;
    let arrtag = phototag.filter(sortPhotographer);
    console.log(arrtag);

    arrtag.addEventListener("click", sortPhotographer);*/
  });

  tags.forEach((tag) => {
    const navBarContainer = document.querySelector("header");
    const navBarDiv = document.getElementById("header-navbar");
    let navBarA = document.createElement("a");
    navBarA.setAttribute("href", "#");
    navBarA.setAttribute("id", "header-navbar-link");

    const navBarSpan = document.createElement("span");
    navBarSpan.setAttribute("class", "span-hidden");

    let navBarSpanTag = document.createElement("span");
    navBarSpanTag.setAttribute("class", "tag");
    navBarSpanTag.setAttribute("data-tag-name", tag);
    console.log(navBarSpanTag);
    navBarSpanTag.append("#" + tag);
    navBarA.appendChild(navBarSpan);
    navBarA.appendChild(navBarSpanTag);
    navBarDiv.appendChild(navBarA);
    navBarContainer.appendChild(navBarDiv);
  });
}

photographerPageIndex();

////////////////////

// .catch((err) => err);
