const imagenSlader = (arrVideogames) =>{
    if(arrVideogames.length>5) arrVideogames = arrVideogames.slice(0,5)
    
    const response = arrVideogames.map((game)=>{return{id:game.id, image:game.image}})
    return response
}

export default imagenSlader