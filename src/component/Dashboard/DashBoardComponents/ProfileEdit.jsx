import { useAuth0 } from "@auth0/auth0-react";
import { Metric, Text, TextInput } from "@tremor/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../../NavBar/logaut/logaut";
import styles from "./profileEdit.module.css"
import ClientVideogames from "./client/clientTable/clientVideogame"
import ClientComments from "./client/clientTable/clientComments"
import ClientTransaction from "./client/clientTable/clientTransactions"

const validation = (input) => {
  let errors = {};
  let regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  if (input.nickname.length > 32) errors.nickname = "can not have more than 32 characters";
  if (input.description.length > 200) errors.description = "can not have more than 200 characters";
  if (!regex.test(input.linkYoutube)) errors.linkYoutube = 'it is not a YouTube link';
  return errors;
};

const Perfil = () => {
  const { user } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [rolUser, setRolUser] = useState(null);
  const [errors, setErrors] = useState({
    image: null,
    nickname: '',
    linkYoutube: "",
    description: "",
  });
  const [input, setInput] = useState({
    image: null,
    nickname: "",
    linkYoutube: "",
    description: "",
  });
  const [data, setData] = useState({})
  const [transaction, setTransaction] = useState({})
  const [table, setTable] = useState("")


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/user/profile/bybalance/${user.sub}`);
        setUserInfo(data);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    const getData = async () =>{
      try {
          const {data} = await axios.get(`http://localhost:3001/user/buyer/${user?.sub}`)
          setData(data)
      } catch (error) {
        console.log(error.message)
      }
  }
  

  const getTransaction = async () =>{
    try {
        const {data} = await axios.get(`http://localhost:3001/user/bytransaction/${user?.sub}`)
        setTransaction(data)
        console.log(data.Wallet.Transactions)
    } catch (error) {
      console.log(error.message)
    }
}
    
    const fetchUserRole = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/user/bytransaction/${user.sub}`);
      } catch (error) {
        console.error(error);
      }
    };
    getData()
    fetchUserInfo();
    fetchUserRole();
    getTransaction()
  }, [user.sub]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validation({
      ...input,
      [e.target.name]: e.target.value,
    }));
  };

  const editHandler = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("file", input.image);
    formData.append("upload_preset", "oiltgqem");
  
    try {
      const { data: { secure_url: imageUrl } } = await axios.post("https://api.cloudinary.com/v1_1/dnkaxvkr9/image/upload", formData);
  
      const sub = user?.sub;
      const update = {
        sub,
        image: imageUrl || userInfo?.profile.image,
        nickname: !errors.nickname && input.nickname.length > 0
          ? input.nickname
          : userInfo?.profile.nickname,
        linkYoutube: !errors.linkYoutube && input.linkYoutube.length > 0
          ? input.linkYoutube
          : userInfo?.profile.linkYoutube,
        description: !errors.description && input.description.length > 0
          ? input.description
          : userInfo?.profile.description,
      };
  
      await axios.put("http://localhost:3001/user/profile", update);
      setInput({
        image: null,
        nickname: '',
        linkYoutube: "",
        description: "",
      });
      alert("Your change is done!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTable =(event)=>{
    setTable(event.target.name)
  }

  const handleImageChange = (e) => {
    setInput((input) => ({
      ...input,
      image: e.target.files[0],
    }));
  };

  // if (!userInfo || !rolUser) {
  //   return null;
  // }

  return (
    <div className={`container-fluid`}>
      <div className="row min-vh-100 flex-column flex-md-row ">
      <div className={`col-md-3 col-xl-2 p-0 bg-dark flex-srink-1 justify-content-center ${styles.containerProfile}`}>
      <div className={styles.profile}>
        <div>
          <button onClick={editHandler} className={styles.buttonEdit}>
            Edit
          </button>
        </div>

      {isActive? (
          <form onSubmit={submitHandle}>
            <label> Img:</label>
            <input
              className={styles.inputs}
              name="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
              placeholder=""
            />
            <label> Nickname:</label>
            <input
            className={styles.inputs}
              name="nickname"
              value={input.nickname}
              onChange={handleChange}
              placeholder="Nickname"
            />
            {errors.nickname && <p>{errors.nickname}</p>}
            <label> Youtube Link:</label>
            <input
             className={styles.inputs}
              name="linkYoutube"
              value={input.linkYoutube}
              onChange={handleChange}
              placeholder="Youtube"
            />
            {errors.linkYoutube && <p>{errors.linkYoutube}</p>}
            <label> Description:</label>
            <input           
             className={styles.inputs}
              name="description"
              value={input.description}
              onChange={handleChange}
              placeholder="Description"
            />
            {errors.description && <p>{errors.description}</p>}
            <br/>
            <button>Confirm</button>
          </form>
        ):(<div>
          <div className={`text-center ${styles.img}`}><img src={user?.picture} alt="" className="img-fluid"/></div>
          <div className={`text-center ${styles.text}`}><span>{user?.email}</span></div>
          <div className={`text-center ${styles.text}`}> <span>{user?.name}</span></div>
          </div>

        )}
        <div className={styles.logout}>
            <Logout/>

        </div>

      </div>
      
      
          <div className="text-center" ><button onClick={handleTable} className={styles.buttonNav} name="videogames">Games</button></div>
          <div className="text-center"><button name="transactions" className={styles.buttonNav} onClick={handleTable}>Transactions</button></div>
            <div className="text-center"><button name="comments" className={styles.buttonNav} onClick={handleTable}>Comments</button></div>
        </div>
          <div className={`col-md-9`}>
            {table=== "videogames"?(<ClientVideogames favorites={data?.favorites}/>):(null)} 
            {table=== "comments"?(<ClientComments comments={data?.comments}/>):(null)} 
            {table=== "transactions"?(<ClientTransaction transaction={transaction?.Wallet?.Transactions}/>):(null)} 
        </div>
    </div>
    </div>
  );
};

export default Perfil;