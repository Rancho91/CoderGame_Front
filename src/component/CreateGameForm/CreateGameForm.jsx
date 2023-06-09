import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage, } from "formik";
import style from "./creategameform.module.css";
import {  getGenres, getPlatforms, postGame } from "../../redux/actions/actions";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";


const CreateGameForm = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const allPlatforms = useSelector((state) => state.allPlatforms);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          released: "",
          platforms: [],
          genres: [],
          price: "",
          gameLink: "",
          description: "",
          imageFile: null,
          sub: user.sub
        }}
        
        validate={(valores) => {
          let errores = {};

          if (!valores.name) {errores.name = "Por favor ingresa un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/.test(valores.name)) {
            errores.name = "El nombre solo puede contener letras y espacio";
          }

          if (!valores.released) {errores.released = "Por favor seleccione una fecha de lanzamiento";
          } else if (new Date(valores.released) > new Date()) {
            errores.released = "La fecha ingresada no puede ser mayor a la fecha actual.";
          }

          if (!valores.platforms || valores.platforms.length === 0) {
            errores.platforms = "Por favor seleccione Plataforma/s "}
        
          if (!valores.genres || valores.genres.length === 0) {
           errores.genres = "Por favor seleccione un Genero"}
        
          if (!valores.price) {errores.price = 'Por favor ingrese el precio del juego';
          } else if (valores.price < 1 || valores.price > 1000) {
            errores.price = 'El precio debe estar entre 1 y 1000';
          }

         if (!valores.gameLink) {
            errores.gameLink = 'El enlace del juego es requerido';
          } else if (!/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[\w.-]*)*\/?$/.test(valores.gameLink)) {
            errores.gameLink = 'Por favor ingresa un enlace de juego válido';
          }
          
         if (!valores.description) {errores.description = "Por favor ingrese la description del juego";
          } else if (valores.description.length > 500)
            errores.description = "no puede ser mayor a 500 caracteres";

         if (!valores.imageFile) errores.imageFile = "Por favor ingrese una imagen";
          else if (!/\.(jpg|png)$/i.test(valores.imageFile.name))
            errores.imageFile = "Formato PNG o JPG."; 
            

          return errores;
        }}
        
        onSubmit={(valores, { resetForm }) => {
          const formData = new FormData();
          formData.append('file', valores.imageFile);
          formData.append('upload_preset', 'oiltgqem');
          
          axios.post('https://api.cloudinary.com/v1_1/dnkaxvkr9/image/upload', formData)
          .then(response => {
            const imageUrl = response.data.secure_url;
            console.log('URL de la imagen:', imageUrl);

        

            dispatch(
              postGame({
                name: valores.name,
                released: valores.released,
                platforms: valores.platforms,
                description: valores.description,
                genres: valores.genres,
                image: imageUrl,
                gameLink: valores.gameLink,
                sub: user.sub,
                price: valores.price,
              }, )
            );
        
            
            // Mover estos comandos aquí
            resetForm();
            console.log("Valores ingresados", valores);
            console.log("Formulario enviado");
            
            cambiarFormularioEnviado(true);
            setTimeout(() => cambiarFormularioEnviado(false), 5000);
          })
          .catch(error => {
            console.error('Hubo un error al cargar la imagen:', error);
          });
          
        }}
        
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <div >
          <Form className={`container ${style.formulario}`}>
            <div className="row ">
            <div class="input-container" className={`col-6`}>
              <label htmlFor="name">Game Name</label>
              <Field type="text" id="name" name="name" placeholder="CS 1.6" />
              <ErrorMessage name="name" component={() => ( <div className="error">{errors.name}</div>)} />
            </div>
            
            <div className={`col-3 outer-container`}>
              <label htmlFor="released">Release date</label>
              <Field type="date" id="released" name="released" placeholder="YYYY-MM-DD" />
              <ErrorMessage name="released" component={() => ( <div className="error">{errors.released}</div> )} />
            </div>
            <div className="col-3"> 
              <label htmlFor="name">Price</label>
              <Field type="number" id="price" name="price" placeholder="199" />
              <ErrorMessage name="price" component={() => ( <div className="error">{errors.price}</div>)} />
            </div>
            </div>
            <div>
            </div>    

              <div className="row">
                <div className="col-12">
                    <label htmlFor="platforms">Platforms</label>
              </div>  
            </div>
            <div className={`row justify-content-start align-items-center ${style.platformsContainer}`}>           
                {allPlatforms.map((platform) => (
                  <div className={`col-2 `}>
                    <label key={platform.id} className={`${style.platformLabel}`}>
                    <div className="d-flex align-items-center justify-content-between">
                    <p className="col-10">{platform.name} </p>
                    <Field type="checkbox" name="platforms" value={platform.name} className="md-2" />
                      </div>
                      </label> 
                    </div>))}
                <ErrorMessage name="platforms" component="div" className={style.error}  />
            </div>
            <hr />

            <div>
            <div className="row">
              <div className="-12"> <label htmlFor="genres">Genres</label> </div>
             
            </div>
                
          <div className={` row justify-content-start align-items-center ${style.platformsContainer}`}>
                        
            {allGenres.map((genres) => (
              <div className={`col-2 `}>
                <label key={genres.id} className={style.genresLabel}>
                  <div className="d-flex align-items-center justify-content-between">
                      <p className="col-10">{genres.name} </p>
                      <Field type="checkbox" name="genres" value={genres.name } className=" md-2" />
                  </div>

                 
            </label>
            </div>
            ))}

            </div>
                <ErrorMessage name="genres" component="div" className={style.error}  />
            </div>

            <div>
              <label htmlFor="name">Game Link</label>
              <Field type="text" id="gameLink" name="gameLink" placeholder="wwww.linkdescarga.com" />
              <ErrorMessage name="gameLink" component={() => ( <div className="error">{errors.gameLink}</div>)} />
            </div>

            <div>
              <label htmlFor="imageFile">Imagen</label>
              <input id="image" name="image" type="file" onChange={(event) => {
                setFieldValue("imageFile", event.currentTarget.files[0]);
              }} />
              {errors.imageFile && touched.imageFile && <div className="error">{errors.imageFile}</div>}
             </div>


            <div>
            <label htmlFor="description">Description</label>
                <Field as="textarea" id="description" name="description" placeholder="Enter game description" />
                <ErrorMessage name="description" component={() => (<div className="error">{errors.description}</div> )} />
            </div>
                            

        <button type="submit">Enviar</button>
        {formularioEnviado && <p className="exito">Formulario enviando con exito!</p>}

        </Form>
        </div>
        )}

      </Formik>
    </>

    )    
}
export default CreateGameForm;