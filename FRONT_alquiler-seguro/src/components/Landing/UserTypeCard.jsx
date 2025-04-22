const UserTypeCard = ({ image, title, text }) => (
  <div className="rounded overflow-hidden shadow-md w-full max-w-md mx-auto flex flex-col">
    <div className="w-full aspect-[4/3] overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-4 flex-grow flex flex-col justify-between">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  </div>
);
export default UserTypeCard;
