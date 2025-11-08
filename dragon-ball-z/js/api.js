export async function obtenerPersonajes() 
{
    const baseUrl = "https://dragonball-api.com/api/characters";
    let todos = [];
    try {//TOTAL DE PAGINAS 6
        for (let i = 1; i <= 6; i++) {
            const res = await fetch(`${baseUrl}?page=${i}&limit=10`);
            if (!res.ok) throw new Error(`Error al cargar página ${i}`);
            const data = await res.json();
            todos = todos.concat(data.items);
        }
        console.log(`✅ Se cargaron ${todos.length} personajes`);
        return todos;
    } catch (error) {
        console.error("❌ Error al obtener personajes:", error);
        throw error;
    }
}
