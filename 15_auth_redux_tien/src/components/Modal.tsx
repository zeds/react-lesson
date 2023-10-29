import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
// import axios from "axios";

const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ModalFrame = styled.div`
  width: 500px;
  /* height: 320px; */
  background: white;
  position: relative;
  font-size: 20px;
  padding: 10px;
  border-radius: 4px;
  background: #f4fbfe;

  .contents {
    display: flexbox;
    gap: 10px;
    img {
      width: 100px;
      object-fit: contain;
    }
    .update {
      /* background: red; */
    }
  }

  .error {
    color: red;
    font-size: 14px;
  }

  input {
    width: 100%;
    padding: 5px;
  }

  .name {
    margin-top: 20px;
  }

  .error {
    height: 20px;
  }

  .buttonBlock {
    display: flex;
    margin-top: 50px;
    justify-content: center;
    gap: 10px;
    button {
      width: 100px;
      border: 2px solid #5483eb;
      border-radius: 4px;
      padding: 4px 0;
      font-weight: bold;
      &:hover {
        opacity: 0.5;
      }
    }
    .cancel {
      background: white;
      color: #5483eb;
    }
    .post {
      background: #5483eb;
      color: white;
    }
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    border: none;
    &:hover {
      background: skyblue;
    }
  }
  .textArea {
    min-width: 325px;
    min-height: 150px;
    padding: 5px;
  }
`;
const Avatar = styled.div`
	display: flex;
	width: 100px;
	margin: 0 auto;
	justify-content: center;
	input {
		width: 100px;
		height: 100px;
		cursor: pointer;
	}
	img {
		position: absolute;
		width: 100px;
		height: 100px;
		background: white;

		/* クリックを無効化 */
		pointer-events: none;
		cursor: pointer;
	}
`;


interface Form {
  name: string;
  username: string;
  file: File;
  introduction: string;
}
const Modal = (props: any) => {
  console.log(props);
  const [image, setImage] = useState(props.data.avatar_url);
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState(props.data.name);
  const [username, setUserName] = useState(props.data.username);
  const [introduction, setIntroduction] = useState(props.data.introduction);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ mode: "onBlur" }); // "onChange"

  const onSubmit = (data: Form) => {
    console.log(data);
    let obj = {
      name: name,
      username: username,
      file: fileName,
      introduction: introduction,
    };
    props.post(obj);
    // UserLogin(data.email, data.password, data.checkbox, navigate, dispatch);
  };

  useEffect(() => {
    // スクロールできないようにする
    console.log("stopping scroll");
    document.body.style.overflow = "hidden";
    return () => {
      // componentWillUnmountの時に呼ばれる
      console.log("start scrolling");
      document.body.style.overflow = "auto";
    };
  }, []);

  //閉じるボタンが押された
  const clickClose = (e: any) => {
    e.stopPropagation();
    props.close();
  };

  //背景がクリックされた
  const clickBackground = () => {
    props.close();
  };

  //Modalがクリックした時、背景がクリックされたイベントも発生
  //してしまうので、それを防ぐ
  const stopPropagation = (e: any) => {
    // console.log("stopPropagation");
    e.stopPropagation();
  };

  //キャンセルボタン
  const clickCancel = () => {
    props.close();
  };

  const changeName = (e: any) => {
    setName(e.target.value);
    //validation
  };
  const changeComment = (e: any) => {
    setUserName(e.target.value);
  };

  //画像の変更
  const clickImageButton = (e: any) => {
    console.log("e=", e.target.files[0]);
    let file = e.target.files[0];
    setImage(window.URL.createObjectURL(file));
    setFileName(file);
  };
  const changeIntroduction = (e: any) => {
    setIntroduction(e.target.value);
  };
  const validateRequired = (value: any) => {
    return value.trim() !== "" ? undefined : "この項目は必須です";
  };
  console.log(errors.name);
  return (
    <ModalContainer onClick={() => clickBackground()}>
      <ModalFrame onClick={stopPropagation}>
        <button className="close" onClick={clickClose}>
          ❌
        </button>
        <div>新規登録</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="contents">
            <Avatar onClick={() => clickImageButton}>
              <img src={image} alt="" />
              <input type="file" accept="image/*" onChange={clickImageButton} />
            </Avatar>
            <div className="update">
              <p className="name">
                名前
                <input
                  {...register("name", { validate: { validateRequired } })}
                  onChange={changeName}
                  value={name}
                  autoFocus={true}
                ></input>
              </p>
              <p className="error">{errors.name?.message as React.ReactNode}</p>
              <p>
                ニックネーム
                <input
                  {...register("username", { validate: { validateRequired } })}
                  onChange={changeComment}
                  value={username}
                ></input>
              </p>
              <p className="error">
                {errors.username?.message as React.ReactNode}
              </p>
              <p>
                自己紹介
                <div>
                  <textarea
                    {...register("introduction", {
                      validate: { validateRequired },
                    })}
                    onChange={changeIntroduction}
                    value={introduction}
                    className="textArea"
                  />
                </div>
              </p>
              <p className="error">
                {errors.introduction?.message as React.ReactNode}
              </p>
            </div>
          </div>

          <div className="buttonBlock">
            <button className="cancel" onClick={() => clickCancel()}>
              キャンセル
            </button>
            <button type="submit" className="post">
              <div>更新</div>
            </button>
          </div>
        </form>
      </ModalFrame>
    </ModalContainer>
  );
};

export default Modal;
