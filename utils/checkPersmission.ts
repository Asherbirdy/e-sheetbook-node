
interface checkPersmissionPayload {
  userId: string
  role?: string
}

export const checkPersmission = (requestUser : any, resourceUserId: checkPersmissionPayload) => {
  // console.log(requestUser)
  // console.log(resourceUserId)
  // console.log(typeof resourceUserId)
  // console.log(requestUser.userId === resourceUserId.userId)
  if (requestUser.role === 'dev') return
  if (requestUser.userId === resourceUserId.userId) return

  throw new Error(
    'Not authorized to access this route [checkPersmission]'
  )
}

export const checkPermissionForDistrict = (
  requestDistrictId: string,
  resourceDistrictId: string
) => {
  if (requestDistrictId === resourceDistrictId) return
  throw new Error(
    'Not authorized to access this route'
  )
}

export const getUserIdByString = (obj: any) => {
  return {
    userId: obj.userId.toString(),
  }
}