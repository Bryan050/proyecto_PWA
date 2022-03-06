const variables = {
  URL: "http://localhost:3000"
}
export const Peticiones = {
    create: async (ruta, datos) => {
      const data = datos;
      let url = new URL(variables.URL+ruta);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!(response.status==201)) {
          const message = "Error with Status Code: " + response.status;
          throw new Error(message);
        }
        return response.json();
      } catch (error) {
        console.log("Error: " + error);
      }
    },
    retrieve: async (ruta)=> {
      let url = new URL(variables.URL+ruta);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            const message = "Error with Status Code: " + response.status;
            throw new Error(message);
          }
          return response.json();
        } catch (error) {
          console.log("Error: " + error);
        }
    },
    retrieveByCredentials: async (ruta, userParam, passwordParam)=> {
      const user = userParam;
      const password = passwordParam;
      let url = new URL(variables.URL+ruta+user+'/'+password);
      console.log(url);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            const message = "Error with Status Code: " + response.status;
            throw new Error(message);
          }
          return response.json();
        } catch (error) {
          console.log("Error: " + error);
        }
    },
    list: async (ruta)=> {
      let url = new URL(variables.URL+ruta);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            const message = "Error with Status Code: " + response.status;
            throw new Error(message);
          }
          return response.json();
        } catch (error) {
          console.log("Error: " + error);
        }
    },
    lastEntry: async (ruta)=> {
      let url = new URL(variables.URL+ruta);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            const message = "Error with Status Code: " + response.status;
            throw new Error(message);
          }
          return response.json();
        } catch (error) {
          console.log("Error: " + error);
        }
    },
    update: async (ruta, datos) => {
      let url = new URL(variables.URL+ruta);;
        const data = datos;
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
             'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data) // We send data in JSON format
           });
    
          if (!response.ok) {
            const message = "Error with Status Code: " + response.status;
            throw new Error(message);
          }
          return response.json();
        } catch (error) {
          console.log("Error: " + error);
        }
    },

    updateWithImage: async (ruta, datos) => {
      console.log(datos.foto);
      let url = new URL(variables.URL+ruta);;
        const data = datos;
        try {
          const response = await fetch(url, {
            method: 'PUT',
            body:new FormData(data)
           });
    
          if (!response.ok) {
            const message = "Error with Status Code: " + response.status;
            throw new Error(message);
          }
          data = response.json();
          console.log(data);
        } catch (error) {
          console.log("Error: " + error);
        }
    },
    delete: async (ruta, id)=> {
      let url = new URL(variables.URL+ruta+id);
        try {
          const response = await fetch(url, { method: "DELETE" });
          if (!response.ok) {
            const message = "Error with Status Code: " + response.status;
            throw new Error(message);
          }
          const data = response.json();
          console.log(data);
        } catch (error) {
          console.log("Error: " + error);
        }
    }
    
  }