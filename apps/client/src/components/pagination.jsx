import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from './icons'

export default function SimplePagination({ currentPage, numPages, actions }) {
  const { prev, next, jump } = actions
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="btn btn-default"
        disabled={currentPage === 1}
        onClick={() => jump(1)}
      >
        <ChevronDoubleLeftIcon />
      </button>
      <button
        className="btn btn-default"
        disabled={currentPage === 1}
        onClick={() => prev()}
      >
        <ChevronLeftIcon />
      </button>
      <button
        className="btn btn-default"
        disabled={currentPage === numPages}
        onClick={() => next()}
      >
        <ChevronRightIcon />
      </button>
      <button
        className="btn btn-default"
        disabled={currentPage === numPages}
        onClick={() => jump(numPages)}
      >
        <ChevronDoubleRightIcon />
      </button>
      <form
        className="flex items-center gap-2"
        onSubmit={e => {
          e.preventDefault()
          const to = e.target.elements.jump.value
          jump(to)
        }}
      >
        <input
          className="input"
          style={{ width: '84px' }}
          type="number"
          min={1}
          max={numPages}
          name="jump"
          placeholder={`${currentPage} / ${numPages}`}
        />
        <button
          type="submit"
          className="btn btn-default"
          style={{
            padding: '16px',
            fontSize: '12px',
          }}
        >
          Go
        </button>
      </form>
    </div>
  )
}
