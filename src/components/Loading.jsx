
const Loading = () => {
  return (
    <div className="min-h-96 w-full flex items-center justify-center">
      <div className="flex items-center justify-center gap-4">
        <p>Loading</p>
        <div className="h-10 w-10 rounded-full border-b border-purple-500 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
