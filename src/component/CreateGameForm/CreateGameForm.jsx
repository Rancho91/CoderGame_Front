import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./creategameform.module.css";
import { postGame, getGenres, getPlatforms } from "../../redux/actions/actions";

const CreateGameForm = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const allPlatforms = useSelector((state) => state.allPlatforms);

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
          } else if (valores.description.length < 500)
            errores.description = "Tiene que ser mayor a 500 caracteres";

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Valores ingresados", valores);
          console.log("Formulario enviado");
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className={style.formulario}>
            <div>
              <label htmlFor="name">Game Name</label>
              <Field type="text" id="name" name="name" placeholder="CS 1.6" />
              <ErrorMessage name="name" component={() => ( <div className="error">{errors.name}</div>)} />
            </div>

            <div>
              <label htmlFor="released">Release date</label>
              <Field type="date" id="released" name="released" placeholder="YYYY-MM-DD" />
              <ErrorMessage name="released" component={() => ( <div className="error">{errors.released}</div> )} />
            </div>

            <div>
                <label htmlFor="platforms">Platforms</label>
                    <div className={style.platformContainer}>
                        {allPlatforms.map((platform) => (
                <label key={platform.id} className={style.platformLabel}>
              <Field type="checkbox" name="platforms" value={platform.name} />
                 {platform.name}
            </label>
            ))}
            </div>
                <ErrorMessage name="platforms" component="div" className={style.error}  />
            </div>
            <hr />

            <div>
                <label htmlFor="genres">Genres</label>
                    <div className={style.genres}>
                        {allGenres.map((genres) => (
                <label key={genres.id} className={style.genresLabel}>
              <Field type="checkbox" name="genres" value={genres.name} />
                 {genres.name}
            </label>
            ))}
            </div>
                <ErrorMessage name="genres" component="div" className={style.error}  />
            </div>

            <div>
              <label htmlFor="name">Price</label>
              <Field type="number" id="price" name="price" placeholder="199" />
              <ErrorMessage name="price" component={() => ( <div className="error">{errors.price}</div>)} />
            </div>

            <div>
              <label htmlFor="name">Game Link</label>
              <Field type="text" id="gameLink" name="gameLink" placeholder="wwww.linkdescarga.com" />
              <ErrorMessage name="gameLink" component={() => ( <div className="error">{errors.gameLink}</div>)} />
            </div>
                                   
            <div>
            <label htmlFor="description">Description</label>
                <Field as="textarea" id="description" name="description" placeholder="Enter game description" />
                <ErrorMessage name="description" component={() => (<div className="error">{errors.description}</div> )} />
            </div>
                            

        <button type="submit">Enviar</button>
        {formularioEnviado && <p className="exito">Formulario enviando con exito!</p>}

        </Form>
        )}

      </Formik>
    </>

    )    
}
export default CreateGameForm;