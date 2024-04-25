import { toast } from "sonner";
import useAuth from "../../../hooks/useAuth";

const ProfilePage = () => {
  const { auth, uploadAvatar } = useAuth();

  const handlerAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return toast.error("La imagen es obligatoria");
    }

    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/jpg" &&
      file.type !== "image/vs+xml" &&
      file.type !== "image/webp"
    ) {
      return toast.error("Imagen no valida");
    }

    if (file.size > 3000000) {
      return toast.error("La imagen no debe pesar más de 3MB");
    }

    uploadAvatar({
      id: auth._id,
      file,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <section className="lg:basis-1/5">
        <div className="bg-gray-100 rounded-md p-5 shadow-lg flex flex-col items-center gap-5">
          {auth.avatar.url !== "" ? (
            <form className="relative">
              <img
                src={auth.avatar.url}
                alt={auth.name}
                className="w-40 h-40 mx-auto object-cover rounded-full"
              />
              <label
                htmlFor="avatar"
                className="absolute top-0 right-0 text-xl bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full hover:cursor-pointer"
              >
                <i className="fi fi-rr-edit"></i>
              </label>
              <input
                onChange={handlerAvatar}
                type="file"
                id="avatar"
                className="hidden"
              />
            </form>
          ) : (
            <div className="w-40 h-40 mx-auto flex items-center justify-center bg-black/50 text-white text-5xl rounded-full">
              <span>{auth.name.charAt(0)}</span>
              <span>{auth.lastName.charAt(0)}</span>
            </div>
          )}
          <div className="text-center">
            <h4 className="text-xl font-medium">
              {auth.name} {auth.lastName}
            </h4>
            <p className="text-sm text-gray-500">{auth.email}</p>
          </div>
        </div>
      </section>
      <section className="lg:basis-4/5">
        <h3 className="text-xl font-bold mb-5">INFORMACIÓN DEL USUARIO</h3>
        <form>
          <input type="file" id="avatar" className="ml-4 appearance-none" />
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
