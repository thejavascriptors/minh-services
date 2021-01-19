import React from 'react';

const Search = ({handleSearch, searchQuery, emptySearch}) => (
  <div className='searchBar'>
    <img className='magnifying' src='https://www.flaticon.com/svg/vstatic/svg/2089/2089805.svg?token=exp=1610740966~hmac=0b4ddbd9f15e9bc0d2f5194ef311bf89' />
    <input className='search' type='text' placeholder='Have a question? Search for answers' onChange={e => handleSearch(e.target.value)}></input>
    <img style={searchQuery.length > 0 ? {'visibility': 'visible'} : {'visibility': 'hidden'}}className='exit' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSir57AKqjH6VYMg11KEt1LpSvYJubL7CVI_A&usqp=CAU' onClick={e => emptySearch(e.target.previousSibling)}/>
  </div>
);

export default Search;