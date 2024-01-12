import useProjects from "../../../hooks/useProjects";
import TextField from "../../../components/UI/inputs/TextField";
import { useState, useMemo ,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModalWithoutBlock, closeModal } from "../../../store/slices/modalsSlice";
import SearchProject from "../searchProject/SearchProject";
import styles from "./search-bar.module.scss";

const isFinded = (searchValue,result) => {
  return (
    searchValue 
  && 
  result?.projects?.length 
  || 
  result?.donates?.length 
  || 
  result?.realestate?.length 
  || 
  result?.crypto?.length
  )
}


const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const searchState = useSelector((state) => state.modals.search.state);
  const { allProjects } = useProjects({});
  const dispatch = useDispatch();
  const searchHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const result = useMemo(() => {
    if (!searchValue) return
    
    const projects = [];
    const donates = [];
    const crypto = [];
    const realestate = [];

    allProjects
      .filter((project) => {
        return String(project.title).toLowerCase().includes(searchValue.toLowerCase());
      })
      .forEach((project) => {
        if (project.path === "donate") {
          donates.push(project);
        } else if (project.path === 'startup'){
          projects.push(project);
        } else if (project.path === 'crypto'){
          crypto.push(project)
        } else if (project.path === 'realestate'){
          realestate.push(project)
        }
      });
    
    return { donates, projects ,crypto ,realestate};
  }, [searchValue]);

  useEffect(() => {
    if(searchValue){
      dispatch(openModalWithoutBlock("search"));
    }else{
      dispatch(closeModal("search"));
    }
  }, [searchValue]);
  
  return (
    <div className={styles.body}>
      <TextField
        id="toggle-modal"
        value={searchValue}
        handler={searchHandler}
      />
      {searchState ? (
        (isFinded(searchValue,result)) ? (
          <div className={styles.searchResults}>
            {result.projects.length ? (
              <>
                <div id="toggle-modal" className={styles.type}>
                  Startups:
                </div>
                <SearchProject handler={() => dispatch(closeModal("search"))} projects={result.projects} />
              </>
            ) : (
              <></>
            )}

            {result.donates.length ? (
              <>
                <div className={styles.type}>Donates:</div>
                <SearchProject handler={() => dispatch(closeModal("search"))} projects={result.donates} />
              </>
            ) : (
              <></>
            )}
            {result.crypto.length ? (
              <>
                <div id="toggle-modal" className={styles.type}>
                  Crypto:
                </div>
                <SearchProject handler={() => dispatch(closeModal("search"))} projects={result.crypto} />
              </>
            ) : (
              <></>
            )}
            {result.realestate.length ? (
              <>
                <div id="toggle-modal" className={styles.type}>
                  Real Estate:
                </div>
                <SearchProject handler={() => dispatch(closeModal("search"))} projects={result.realestate} />
              </>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className={styles.notFind}>
            <div className={styles.title}>Nothing found...</div>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
