export const ContactButton = (props) => {
  return (
    <button className="bg-black text-white p-3 rounded-md hover:bg-gray-700 ">
      {props.children}
    </button>
  );
};
