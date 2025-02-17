document.getElementById('search-btn').addEventListener('click', fetchGitHubUser);

async function fetchGitHubUser() {
  const username = document.getElementById('username').value.trim();
  const errorMessage = document.getElementById('error-message');
  const profileContainer = document.getElementById('profile');

  if (!username) {
    errorMessage.textContent = 'Please enter a GitHub username.';
    profileContainer.style.display = 'none';
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('User not found or network issue.');
    }
    const data = await response.json();

    // Display user data
    profileContainer.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}'s profile picture">
      <h2>${data.name || data.login}</h2>
      <p>${data.bio || 'No bio available.'}</p>
      <p>Public Repositories: ${data.public_repos}</p>
      <p>Followers: ${data.followers}</p>
      <p>Following: ${data.following}</p>
      <a href="${data.html_url}" target="_blank">Visit Profile</a>
    `;
    profileContainer.style.display = 'block';
    errorMessage.textContent = '';
  } catch (error) {
    errorMessage.textContent = 'Error: ' + error.message;
    profileContainer.style.display = 'none';
  }
}