const searchForm = document.querySelector(".search-form")
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")

const profileImage = document.querySelector(".profile-image")
const nameElement = document.querySelector(".name")
const usernameElement = document.querySelector(".username")
const bioElement = document.querySelector(".bio")

const reposElement = document.querySelector(".repos")
const followersElement = document.querySelector(".followers")
const followingElement = document.querySelector(".following")

const locationText = document.querySelector(".location-text")
const profileLink = document.querySelector(".profile-link")

const messageElement = document.querySelector(".message")

async function fetchProfile(username) {

  clearProfile();

  searchBtn.disabled = true;
  searchBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;

  const url = `https://api.github.com/users/${username}`;
  try{
    const response = await fetch(url)
    const data = await response.json()

    if(!response.ok){
      messageElement.textContent = data.message === "Not Found" ? "Github user not found." : data.message;
      return;
    }
    displayProfile(data)
    messageElement.textContent = ""

  } catch(error){
    console.error(error)
    messageElement.textContent = "Please check your internet connection.";
  } finally{
    searchBtn.disabled = false;
    searchBtn.innerHTML =  `<i class="fa-solid fa-magnifying-glass"></i>`;
  }
  
}


function displayProfile(data){

  const {
  avatar_url,
  name,
  login,
  bio,
  location,
  followers,
  following,
  public_repos,
  html_url
} = data;

  profileImage.src = avatar_url;
  nameElement.textContent = name || login;
  usernameElement.textContent = `@${login}`;
  bioElement.textContent = bio || "No bio available";
  locationText.textContent = location || "Not available";
  followersElement.textContent = followers;
  followingElement.textContent = following;
  reposElement.textContent = public_repos;
  profileLink.href = html_url;
  profileLink.style.pointerEvents = "auto";
}

function clearProfile(){

  profileImage.src = "images/github.jpg";

  nameElement.textContent = "";
  usernameElement.textContent = "";
  bioElement.textContent = "";
  locationText.textContent = "";

  followersElement.textContent = "0";
  followingElement.textContent = "0";
  reposElement.textContent = "0";
  profileLink.style.pointerEvents = "none";
}



searchForm.addEventListener("submit", async (e)=>{
  e.preventDefault()

  const username = searchInput.value.trim()
  
  if(!username){
    messageElement.textContent = "Please enter a username.";
    return
  }
  messageElement.textContent = ""

  await fetchProfile(username)
  
})
