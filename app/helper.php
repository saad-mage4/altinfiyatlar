<?php

namespace App;

class helper
{
    /**
     * @param $modelClass
     * @param $object
     * @param $primaryKey
     * @param $columnsToUpdate
     * @return string
     */
    public function saveOrUpdateEntity($modelClass, $object, $key, $columnsToUpdate = null): string
    {
        $existingEntity = $modelClass::where($object->$key, $key)->first();

        if ($existingEntity) {
            if ($columnsToUpdate !== null) {
                $dataToUpdate = [];
                foreach ($columnsToUpdate as $column) {
                    if (property_exists($object, $column)) {
                        $dataToUpdate[$column] = $object->$column;
                    }
                }
                $existingEntity->fill($dataToUpdate);
                $existingEntity->save();
                $message = 'Records Updated!';
            } else {
                $existingEntity->fill((array)$object);
                $existingEntity->save();
                $message = 'Records Updated!';
            }
        } else {
            $newEntity = new $modelClass();
            $newEntity->fill((array)$object);
            $newEntity->save();
            $message = 'Records Saved!';
        }
        return $message;
    }
}
