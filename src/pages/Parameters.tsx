const Parameters: React.FC = () => {
  return (
    <div className={`flex flex-col items-center justify-center h-full text-lg`}>
      <p>Set the Parameters:</p>
      <label className="mt-2">
        Tempo:
        <input
          type="number"
          placeholder="Enter tempo"
          className="ml-2 px-2 py-1 bg-gray-700 border border-gray-500"
        />
      </label>
      <label className="mt-2">
        Duration:
        <input
          type="number"
          placeholder="Enter duration in seconds"
          className="ml-2 px-2 py-1 bg-gray-700 border border-gray-500"
        />
      </label>
      <label className="mt-2">
        Genre:
        <select className="ml-2 px-2 py-1 bg-gray-700 border border-gray-500">
          <option>Classical</option>
          <option>Jazz</option>
          <option>Pop</option>
          <option>Rock</option>
        </select>
      </label>
    </div>
  )
}

export { Parameters }
