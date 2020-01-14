import React from 'react'

const Pagination = ({page, maxPages, onChangePage}) => {

  const list = (maxPages) => {
    const arr = []
    for (let i = 0; i < maxPages; i++) {
      arr.push(i + 1)
    }
    return arr
  }

  const _nextPage = () => {
    if (page < maxPages)
      return <li className="waves-effect"
                 onClick={e => {
                   e.preventDefault()
                   onChangePage(page + 1)
                 }}>
        <a href="#!"><i className="material-icons">chevron_right</i></a>
      </li>
    else
      return <li className="disabled"
                 onClick={e => {
                   e.preventDefault()
                 }}>
        <a href="#!"><i className="material-icons">chevron_right</i></a>
      </li>

  }

  const _prevPage = () => {
    if (page > 1)
      return <li className="waves-effect"
                 onClick={e => {
                   e.preventDefault()
                   onChangePage(page - 1)
                 }}>
        <a href="#!"><i className="material-icons">chevron_left</i></a>
      </li>
    else
      return <li className="disabled"
                 onClick={e => {
                   e.preventDefault()
                 }}>
        <a href="#!"><i className="material-icons">chevron_left</i></a>
      </li>

  }


  return (
    <ul className="pagination">
      {_prevPage()}
      {
        list(maxPages).map(item => {
          return <li
            key={item}
            className={item === page ? 'active' : 'waves-effect'}
            onClick={(e) => {
              e.preventDefault()
              onChangePage(item)
            }}
          >
            <a href="#!">{item}</a>
          </li>
        })
      }
      {_nextPage()}
    </ul>
  )
}

export {Pagination}
