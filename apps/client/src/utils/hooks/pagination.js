import { useState } from 'react'
import { useCallback } from 'react'

function usePagination(data = [], { itemsPerPage = 8, page = 1 } = {}) {
  const [currentPage, setCurrentPage] = useState(page)
  let numPages = Math.floor(data.length / itemsPerPage) + 1

  function currentData() {
    const offset = (currentPage - 1) * itemsPerPage
    return data.slice(offset, offset + itemsPerPage)
  }

  function next() {
    jump(Math.min(currentPage + 1, numPages))
  }

  function prev() {
    jump(Math.max(currentPage - 1, 1))
  }

  const jump = useCallback(
    page => {
      const pageNumber = Math.max(1, page)
      setCurrentPage(Math.min(pageNumber, numPages))
    },
    [numPages, setCurrentPage],
  )

  return {
    numPages,
    currentData,
    currentPage,
    actions: {
      prev,
      jump,
      next,
    },
  }
}

export { usePagination }
