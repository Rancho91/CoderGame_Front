const imagenSlader = (arrVideogames, cant) =>{
    if (arrVideogames.length > cant) {
        arrVideogames = arrVideogames.sort(() => Math.random() - 0.5).slice(0, cant);
      }    
    const response = arrVideogames.map((game)=>{return{id:game.id, image:game.image, name:game.name, price:game.price, released:game.released, description:game.description}})
    return response
}


export default imagenSlader