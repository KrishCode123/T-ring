import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
  import { HOST } from "@/lib/constants";
  
  const ProfileModal = ({ isOpen, contact, onClose }) => {
    if (!contact) return null;
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-max flex flex-col items-center py-8">
          
          {/* Avatar */}
          <Avatar className="h-24 w-24 mb-4">
            {contact.image ? (
              <AvatarImage
                src={`${HOST}/${contact.image}`}
                alt="profile"
                className="rounded-full bg-cover h-full w-full"
              />
            ) : (
              <AvatarFallback className="bg-blue-500 h-full w-full flex items-center justify-center rounded-full text-3xl uppercase">
                {contact.firstName.charAt(0)}
              </AvatarFallback>
            )}
          </Avatar>
  
          {/* Full Name */}
          <DialogTitle className="text-xl font-bold">{`${contact.firstName} ${contact.lastName}`}</DialogTitle>
  
          {/* Email */}
          <DialogDescription className="text-neutral-400">
            {contact.email}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ProfileModal;
  