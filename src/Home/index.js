import SearchAppBar from "../Components/NavBar";
import { useStyles } from "./style";

import { useState, useEffect, Fragment } from "react";
import { createApi } from "unsplash-js";
import { Box, Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import MediaCard from "../Components/Card";
import Animations from "../Components/Loading";

const HomePage = () => {
  const [data, setPhotosResponse] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsloading] = useState(true);

  const handleChange = (event, pageNumber) => {
    setPageNumber(pageNumber);
  };

  const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: "r6c2slsyM0bVabYqQ5e1G5-2_jQlkpfbyUhds4KUtQw",
  });

  useEffect(() => {
    api.search
      .getPhotos({
        query: search || "random",
        orientation: "landscape",
        perPage: 28,
        page: pageNumber,
      })
      .then((result) => {
        setPhotosResponse(result.response);
        setIsloading(false);
      })
      .catch(() => {
        console.log("something went wrong!");
        setIsloading(false);
      });
  }, [pageNumber, search]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [pageNumber]);

  const classes = useStyles();
  //console.log(data);

  return (
    <Fragment>
      <SearchAppBar setSearch={setSearch} searchValue={search} />
      <Container maxWidth="xl">
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Animations />
          </Box>
        ) : (
          <Box className={classes.root}>
            {data.results.map((item) => {
              return (
                <MediaCard
                  full_Link={item.urls.full}
                  key={item.id}
                  imagePath={item.urls.regular}
                  alt={item.alt_description}
                />
              );
            })}
          </Box>
        )}
        {data.total_pages > 1 && (
          <Box className={classes.root}>
            <Pagination onChange={handleChange} count={data.total_pages} />
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export default HomePage;
