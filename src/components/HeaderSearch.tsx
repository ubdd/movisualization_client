import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router-dom";

const Container = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  &:active {
    outline: none;
    border: none;
  }

  &:link {
    outline: none;
    border: none;
  }
`;

const SearchToggleIcon = styled.i`
  font-size: 1.2rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;

const ExecuteSearchIcon = styled.i`
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  right: 0.5rem;
  color: #aaa;
`;

const SearchTerm = styled.input<{ open: boolean }>`
  width: ${props => (props.open ? "12rem" : "0px")};
  height: 1.7rem;
  transition: 0.5s ease;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: white;
  opacity: ${props => (props.open ? "1" : "0")};
  padding: ${props => (props.open ? "0 2rem 0 0.5rem" : "0")};
  margin-left: ${props => (props.open ? undefined : "1.5rem")};
  color: #555;
  font-weight: 500;
  overflow: hidden;
  outline: none;
`;

const HeaderSearch = ({ history }: RouteComponentProps) => {
  const node: any = useRef({});
  const inputRef: any = useRef({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClickOutside = (e: any) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
    setSearchTerm("");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOnClickToggleIcon = (e: React.MouseEvent<HTMLElement>) => {
    if (open) {
      setOpen(!open);
    } else {
      if (inputRef !== undefined && inputRef.current !== undefined) {
        inputRef.current.focus();
      }
      setOpen(!open);
    }
  };

  const handleOnClickExecuteSearchIcon = (e: React.MouseEvent<HTMLElement>) => {
    if (searchTerm && searchTerm.trim()) {
      history.push({
        pathname: `/search/${searchTerm}`
      });
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const handleOnKeyDown = (e: any) => {
    if (searchTerm && searchTerm.trim() && e.keyCode === 13) {
      history.push({
        pathname: `/search/${searchTerm}`
      });
      setSearchTerm("");
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <Container ref={node}>
      {open && (
        <SearchToggleIcon
          onClick={handleOnClickToggleIcon}
          className={"fas fa-times"}
        />
      )}
      <SearchTerm
        ref={inputRef}
        open={open}
        value={searchTerm}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        placeholder="영화 제목, 영화 배우"
      />
      <ExecuteSearchIcon
        onClick={
          open ? handleOnClickExecuteSearchIcon : handleOnClickToggleIcon
        }
        className={"fas fa-search"}
      />
    </Container>
  );
};

export default withRouter(HeaderSearch);
