import React from "react";
import * as S from "./Styled.Write";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import shortid from "shortid";
import { addPost } from "../../api/posts";
import useInput from "../../hooks/useInput";
function Write() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const [writer, onChangeWriterHandler] = useInput("");
  const [title, onChangeTitleHandler] = useInput("");
  const [password, onChangePasswordHandler] = useInput("");
  const [contents, onChangeContentsHandler] = useInput("");

  const onClickSubmitButtonHandler = (e) => {
    e.preventDefault();

    if (!writer || !title || !password || !contents) {
      alert("빈 내용을 채워주세요.");
      return;
    }

    const newPost = {
      id: shortid.generate(),
      writer,
      title,
      password,
      contents,
    };

    mutation.mutate(newPost);
    navigate("/");
  };
  return (
    <S.StForm onSubmit={(e) => onClickSubmitButtonHandler(e)}>
      <S.StPostContainer>
        <S.StDiv>작성자</S.StDiv>
        <S.StInput
          type="text"
          placeholder="작성자"
          value={writer}
          onChange={onChangeWriterHandler}
        />
        <S.StDiv>제목</S.StDiv>
        <S.StInput
          type="text"
          placeholder="제목"
          value={title}
          onChange={onChangeTitleHandler}
        />
        <S.StDiv>비밀번호</S.StDiv>
        <S.StInput
          type="password"
          placeholder="수정, 삭제를 위한 비밀번호"
          value={password}
          onChange={onChangePasswordHandler}
        />
        <S.StDiv>내용</S.StDiv>
        <S.StTextArea
          value={contents}
          onChange={onChangeContentsHandler}
        ></S.StTextArea>

        <S.StButtonArea>
          <Button
            background_color="white"
            border="1px solid #cccccc"
            width="60px"
            height="30px"
          >
            등록
          </Button>
          <Button
            background_color="white"
            border="1px solid #cccccc"
            width="60px"
            height="30px"
            onClick={() => {
              navigate("/");
            }}
          >
            취소
          </Button>
        </S.StButtonArea>
      </S.StPostContainer>
    </S.StForm>
  );
}

export default Write;
