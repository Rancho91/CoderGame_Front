import React from "react"   
import styles from "./footer.module.css"

const Footer = () =>{
    
    
    
    
    return(        
        <div className="container">
        <footer className={`footer text-center ${styles.footer} `}>
        <div className="row justify-content-center align-items-center">
        <div className="col-md-3 d-none d-md-block">
                <img src="https://res.cloudinary.com/dnkaxvkr9/image/upload/v1686082344/f7disvq5mkgf0jpvzgsy.png" alt="" 
                className={`img-fluid ${styles.logo}`} />
            </div>

            <div className="col-5">
                <h6 className={styles.title}>Tecnologies:</h6>
            <div className="row">
            <div className=" col-6">
            <div className={styles.text}><span>ReactJS</span></div>
               <div className={styles.text}><span>NodeJS</span></div>
               <div className={styles.text}><span>PostgreSQL</span></div>
               
            </div>
            <div className="col-6">
                 <div className={styles.text}><span>Express</span></div>
                <div className={styles.text}><span>Redux</span></div>
                <div className={styles.text}><span>Bootstrap</span></div>
            </div>      
            </div>     
            </div>

            <div className="col-4">
                <h6 className={styles.title}>Integrantes</h6>
                <div className="row">
                <div className="col-6">
                    <span className={styles.text}>Walter Porta</span>
                    <div className="row justify-content-center">
                    <div className="col-2">
                    <a href="https://github.com/walterporta"> <img src="https://res.cloudinary.com/dxatwbzff/image/upload/v1684165478/github_logo_icon_147285_zgpagr.png" alt="" className={`img-fluid ${styles.imgSmaller}`}/></a>
                    </div>
                    <div className="col-2">
                    <a href="https://www.linkedin.com/in/walter-porta-589a52254/"><img src="https://res.cloudinary.com/dxatwbzff/image/upload/v1681686708/Personal%20Proyects/Linkedin_wvwa2u.png" alt="" className={`img-fluid ${styles.imgSmaller}`}/> </a>
                    </div>
                    <div className="col-2">
                    <a href="https://api.whatsapp.com/send/?phone=3426106008&text&app_absent=0" target="_blank">   
                     <img align="center" src="https://www.vectorlogo.zone/logos/whatsapp/whatsapp-tile.svg" alt="https://wa.me/+undefined543426106008?text=Hola%20Alejandro,%20soy%20" className={`img-fluid ${styles.imgSmaller}`} />
                     </a>
                </div>
                </div>
               
                
                
                </div>
                <div className="col-6">
                <span className={styles.text}>Sanchez Ramiro</span>
              <div className="row justify-content-center">
                <div className="col-2">
                <a href="https://github.com/Rancho91"> <img src="https://res.cloudinary.com/dxatwbzff/image/upload/v1684165478/github_logo_icon_147285_zgpagr.png" alt="" className={`img-fluid ${styles.imgSmaller}`}/></a>
                </div>
                <div className=" col-2">
                <a href="https://www.linkedin.com/in/ramiro-sanchez-solano/"><img src="https://res.cloudinary.com/dxatwbzff/image/upload/v1681686708/Personal%20Proyects/Linkedin_wvwa2u.png" alt="" className={`img-fluid ${styles.imgSmaller}`}/> </a>
                </div>
                <div className="col-2">
                <a href="https://api.whatsapp.com/send/?phone=3548504261&text&app_absent=0" target="_blank">
                 <img align="center" src="https://www.vectorlogo.zone/logos/whatsapp/whatsapp-tile.svg" alt="https://wa.me/+undefined543426106008?text=Hola%20Alejandro,%20soy%20" className={`img-fluid ${styles.imgSmaller}`} />
                     </a>
                </div>
                </div>
            </div>
                </div>
                </div>       

        </div>
        
    </footer>
    </div>
    )
    
}

export default Footer