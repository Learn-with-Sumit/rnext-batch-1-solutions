export default function changeTheme(theme) {
  const html = document.documentElement;
  const classes = html?.classList;
  if (theme) {
    classes.remove("dark");
    localStorage.removeItem("theme");
    return false;
  } else {
    classes.add("dark");
    localStorage.setItem("theme", true);
    return true;
  }
}
