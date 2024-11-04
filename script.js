// Initialize contacts from localStorage if they exist
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Function to render the contact list
function renderContact(contact) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
  const list = document.querySelector(".Contact_list");
  
  // Check if the contact exists in the DOM and remove it if deleted
  const existingItem = document.querySelector(`[data-key='${contact.id}']`);
  if (contact.deleted) {
    if (existingItem) existingItem.remove();
    return;
  }
  
  // Create the contact item in the DOM if it doesn't already exist
  if (!existingItem) {
    const node = document.createElement("article");
    node.setAttribute("class", "person");
    node.setAttribute("data-key", contact.id);
    node.innerHTML = `
      <img src="${contact.imageurl}" alt="${contact.name}'s Image">
      <div class="contactdetail">
        <h4>${contact.name}</h4>
        <p>Email: ${contact.email}</p>
        <p>Phone: ${contact.contactnumber}</p>
      </div>
      <button class="delete-contact js-delete-contact">Delete</button>
    `;
    list.append(node);
  }
}

// Add event listener for the delete button on the contact list
document.querySelector(".Contact_list").addEventListener("click", (event) => {
  if (event.target.classList.contains("js-delete-contact")) {
    const itemKey = event.target.closest(".person").dataset.key;
    deleteContact(itemKey);
  }
});

// Function to delete a contact by ID
function deleteContact(key) {
  contacts = contacts.map(contact => 
    contact.id === Number(key) ? { ...contact, deleted: true } : contact
  );
  renderAllContacts();
}

// Function to render all contacts (clears and re-renders)
function renderAllContacts() {
  document.querySelector(".Contact_list").innerHTML = "";
  contacts.forEach(contact => renderContact(contact));
}

// Add a new contact
function addContact(name, email, imageurl, contactnumber) {
  const contactObject = {
    name,
    email,
    imageurl,
    contactnumber,
    id: Date.now()
  };
  contacts.push(contactObject);
  renderContact(contactObject);
}

// Form submit event listener to add a new contact
document.querySelector(".js-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("fullName").value;
  const email = document.getElementById("myEmail").value;
  const imageurl = document.getElementById("imgurl").value;
  const contactnumber = document.getElementById("myTel").value;

  addContact(name, email, imageurl, contactnumber);
  document.querySelector(".js-form").reset();
});

// Render contacts on page load
document.addEventListener("DOMContentLoaded", () => {
  renderAllContacts();
});
