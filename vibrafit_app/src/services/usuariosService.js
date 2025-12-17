let usuariosFake = [
  {
    id: 1,
    nombre: "Juan Pérez",
    correo: "juan@mail.com",
    password: "123456",
    rolId: 1
  },
  {
    id: 2,
    nombre: "Ana Gómez",
    correo: "ana@example.com",
    password: "123456",
    rolId: 2
  },
  {
    id: 3,
    nombre: "Carlos Admin",
    correo: "carlos@mail.com",
    password: "123456",
    rolId: 3
  }
];

const getRolFromId = (rolId) => {
  const roles = {
    1: "Cliente",
    2: "Entrenador",
    3: "Administrador"
  };
  return roles[rolId] || "Cliente";
};

const removePassword = (user) => {
  const copy = { ...user };
  delete copy.password;
  return {
    ...copy,
    rol: getRolFromId(copy.rolId) 
  };
};

const usuariosService = {
  getAll() {
    return Promise.resolve(usuariosFake.map(removePassword));
  },

  login(correo, password) {
    const user = usuariosFake.find(
      (u) => u.correo === correo && u.password === password
    );

    if (!user) {
      return Promise.reject(new Error("Credenciales incorrectas"));
    }

    return Promise.resolve({
      success: true,
      token: "mock-token",
      usuario: removePassword(user)
    });
  }
};

export default usuariosService;

