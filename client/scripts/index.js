// Esperar a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Obtener referencias a los elementos del DOM
  const userForm = document.getElementById('userForm');
  const usernameInput = document.getElementById('username');
  const userList = document.getElementById('userList');

  // Manejar el evento de envío del formulario
  userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    const username = usernameInput.value; // Obtener el valor del campo de entrada

    try {
      const newUser = await addUser(username); // Llamar a la función para agregar un usuario
      appendUserToList(newUser); // Añadir el nuevo usuario a la lista en el DOM
      usernameInput.value = ''; // Limpiar el campo de entrada
    } catch (error) {
      console.error('Error:', error); // Manejar errores
    }
  });

  // Función para obtener y mostrar los usuarios almacenados
  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:3000/api/users'); // Solicitud GET

      const users = await response.json(); // Parsear la respuesta JSON
      users.forEach(appendUserToList); // Añadir cada usuario a la lista en el DOM
    } catch (error) {
      console.error('Error:', error); // Manejar errores
    }
  }

  // Función para agregar un nuevo usuario mediante una solicitud POST
  async function addUser(username) {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }), // Enviar el nombre del usuario en el cuerpo de la solicitud
    });

    if (!response.ok) {
      throw new Error('Error al agregar usuario'); // Manejar errores de la solicitud
    }

    return await response.json(); // Parsear y devolver la respuesta JSON
  }

  // Función para añadir un usuario a la lista en el DOM
  function appendUserToList(user) {
    const listItem = document.createElement('li'); // Crear un nuevo elemento de lista
    listItem.textContent = user.username; // Establecer el texto del elemento de lista
    userList.appendChild(listItem); // Añadir el elemento de lista a la lista
  }

  fetchUsers(); // Llamar a la función para obtener y mostrar los usuarios almacenados al cargar la página
});
