export const getInitials = (fullName: string) => {
  const splitName = fullName.split(' ');

  return (
    splitName[0].charAt(0).toUpperCase() + splitName[1].charAt(0).toUpperCase()
  );
};
