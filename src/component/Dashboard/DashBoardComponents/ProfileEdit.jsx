import { useAuth0 } from "@auth0/auth0-react";
import { Metric, Text, TextInput } from "@tremor/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../../NavBar/logaut/logaut";

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
    nickname: '',
    linkYoutube: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/user/profile/bybalance/${user.sub}`);
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/user/bytransaction/${user.sub}`);
        setRolUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
    fetchUserRole();
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
  

  const handleImageChange = (e) => {
    setInput((input) => ({
      ...input,
      image: e.target.files[0],
    }));
  };

  if (!userInfo || !rolUser) {
    return null;
  }

  return (
    <div>
      <div className="text-center">
        <img src={userInfo?.profile.image || user?.picture} alt="Profile" />
        <br />
        <button onClick={editHandler}>
          Edit
        </button>

        {isActive && (
          <form onSubmit={submitHandle}>
            <label> Img:</label>
            <TextInput
              name="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
              placeholder="Insert image link here!!"
            />
            <label> Nickname:</label>
            <TextInput
              name="nickname"
              value={input.nickname}
              onChange={handleChange}
              placeholder="Text Here!!"
            />
            {errors.nickname && <p>{errors.nickname}</p>}
            <label> Youtube Link:</label>
            <TextInput
              name="linkYoutube"
              value={input.linkYoutube}
              onChange={handleChange}
              placeholder="Text Here!!"
            />
            {errors.linkYoutube && <p>{errors.linkYoutube}</p>}
            <label> Description:</label>
            <TextInput
              name="description"
              value={input.description}
              onChange={handleChange}
              placeholder="Text Here!!"
            />
            {errors.description && <p>{errors.description}</p>}
            <br/>
            <button>Confirm</button>
          </form>
        )}
        <h2>
          {userInfo?.profile.nickname || user?.nickname}
        </h2>
        {rolUser?.rol === 'client' && (
          <>
            <p>Coins Balance:</p>
            <Metric>{userInfo?.balance.balance} coins.</Metric>
            <Link to="/payment">
              Buy Coins
            </Link>
          </>
        )}
        <p>Youtube link:</p>
        <Text>{userInfo?.profile.linkYoutube}</Text>
        <p>Description:</p>
        <Text>{userInfo?.profile.description}</Text>
        {rolUser?.rol === 'client' && !rolUser?.requestSeller && (
          <button onClick={async () => {
            const sub = user?.sub;
            const response = await axios.post('http://localhost:3001/email/request/seller', {sub});
            alert('An admin will be in touch as soon as possible.');
          }}>
            Sell your games with us!!
          </button>
        )}
        <br />
        <br />
        <Logout />
      </div>
    </div>
  );
};

export default Perfil;