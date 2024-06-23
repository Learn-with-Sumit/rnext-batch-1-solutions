export const uploadImage = async (fileInputRef, toast, mutation) => {
  try {
    const formData = new FormData()
    const file = fileInputRef.current.files[0]

    if (!file) return // if there is no file then don't upload

    formData.append('avatar', file)

    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Profile picture updated', {
          autoClose: 1000,
        })
      },
    })
  } catch (error) {
    toast.error('Error uploading profile picture')
  }
}
