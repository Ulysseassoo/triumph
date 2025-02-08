import { Driver, DriverLicense } from '@/lib/apiEntities'
import { DriverLicenseTable } from '../driverLicense/DriverLicenseTable'
import { Card } from '../ui/Card'
import { Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { AddDriverLicenseDialog } from '../driverLicense/AddDriverLicenseDialog'

const DriverLicenseCard = ({ driver, onAddLicense }: { driver: Driver, onAddLicense: (license: DriverLicense) => void }) => {

    return (
        <Card className='p-6 h-fit'>
            <h2 className="text-2xl font-semi tracking-tight mb-6">
                Permis
            </h2>

            {
                driver.licenses.length === 0 ?
                    <div style={{ textAlign: "center" }}>Ce conducteur n'a pas de permis.</div>
                    :
                    <DriverLicenseTable licenses={driver.licenses} />
            }

            <AddDriverLicenseDialog driver={driver} onDriverLicenseAdded={onAddLicense}>
                <Button className='mt-8'>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un permis
                </Button>
            </AddDriverLicenseDialog>
        </Card >
    )
}

export default DriverLicenseCard
