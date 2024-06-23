import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ProfilePasswordTab = (prop: IProfilePasswordTabProp) => {
  const {
    personalProfileForm,
    passwordForm,
    tab,
    setTab,
    dictionary: { account, password },
    isAccountTypeFacebookOrGoogle,
  } = prop
  return (
    <Tabs
      value={tab}
      onValueChange={(tab) => setTab(tab)}
      defaultValue='account'
      className='w-[400px]'
    >
      <TabsList>
        <TabsTrigger value='account'>{account}</TabsTrigger>
        {!isAccountTypeFacebookOrGoogle && (
          <TabsTrigger value='password'>{password}</TabsTrigger>
        )}
      </TabsList>
      <TabsContent className='w-fit' value='account'>
        {personalProfileForm}
      </TabsContent>
      <TabsContent className='w-fit' value='password'>
        {passwordForm}
      </TabsContent>
    </Tabs>
  )
}
export default ProfilePasswordTab
