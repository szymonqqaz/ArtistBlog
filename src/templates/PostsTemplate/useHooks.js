import { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const graphqlQuary = graphql`
  {
    swapi {
      posts(orderBy: date_DESC) {
        id
        title
        shortDesc
        date
        readTime
        category
        image {
          url
        }
      }
    }
    allPost {
      nodes {
        id
        postId
        myOwnImg {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 600, fit: INSIDE) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const useHook = () => {
  const [postsToShow, setPostsToShow] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const staticQueryData = useStaticQuery(graphqlQuary);

  const {
    swapi: { posts },
  } = staticQueryData;

  const {
    allPost: { nodes: postsImages },
  } = staticQueryData;

  const getAllCategories = () => {
    const categ = [];
    posts.forEach((post) => {
      post.category.forEach((categItem) => {
        const findInCateg = categ.find((e) => e.categoryName === categItem);

        if (!findInCateg) {
          categ.push({ categoryName: categItem, isSelected: false });
        }
      });
    });
    setAllCategories(categ);
  };

  const filterPosts = () => {
    const selectedCategObjects = allCategories.filter(
      (categ) => categ.isSelected === true
    );

    const selectedCateg = selectedCategObjects.map((e) => e.categoryName);

    if (selectedCateg.length === 0) {
      setPostsToShow(posts);
    } else {
      const resoult = [];

      posts.forEach((post) => {
        const intersection = post.category.filter(
          (e) => selectedCateg.indexOf(e) > -1
        );

        if (intersection.length !== 0) {
          resoult.push(post);
        }
      });

      setPostsToShow(resoult);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [allCategories]);

  return {
    allCategories,
    postsToShow,
    setAllCategories,
    postsImages,
  };
};

export default useHook;
