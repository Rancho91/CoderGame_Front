import React from "react"


const Pagination = ({page, pages, handlerFilter, renderButtons}) =>{


    const selectPage = (eve) =>{

        let value = eve.target.value

        handlerFilter(eve.target.value)
    }


    return(<div>
          <div className={`col-md-12 d-flex justify-content-center `}>
      {pages ? (
        renderButtons?.map((pageNumb) => {
          return (
            <button  name="page" value={pageNumb} onClick={selectPage} >
              {pageNumb}
            </button>
          );
        })
      ) : null}
    </div>
    </div>

    )
}

export default Pagination