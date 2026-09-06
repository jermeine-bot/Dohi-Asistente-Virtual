import { IMCCategory, WeightRecord } from '../types/Weight';
import { supabase } from '@/server/src/config/supabase';

export interface SaveWeightRecordData {
  weightKg: number;
  heightCm: number;
  imc: number;
  category: IMCCategory;
}
const mapWeightRecord = (row: any): WeightRecord => {
  return {
    id: row.id,
    date: row.recorded_at,
    weightKg: Number(row.weight_kg),
    heightCm: Number(row.height_cm),
    imc: Number(row.bmi),
    category: row.category as IMCCategory,
  };
};

const getAuthenticatedUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(
      `No fue posible verificar la sesión: ${error.message}`
    );
  }

  if (!user) {
    throw new Error('No hay un usuario autenticado.');
  }

  return user;
};

export const getWeightHistory = async (): Promise<WeightRecord[]> => {
  const user = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('weight_records')
    .select(
      'id, user_id, weight_kg, height_cm, bmi, category, recorded_at, created_at'
    )
    .eq('user_id', user.id)
    .order('recorded_at', {
      ascending: true,
    });

  if (error) {
    console.error(
      'Error obteniendo historial de peso:',
      error
    );

    throw new Error(
      `No fue posible obtener el historial: ${error.message}`
    );
  }

  return (data ?? []).map(mapWeightRecord);
};

export const getLatestWeight = async (): Promise<WeightRecord | null> => {
  const user = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('weight_records')
    .select(
      'id, user_id, weight_kg, height_cm, bmi, category, recorded_at, created_at'
    )
    .eq('user_id', user.id)
    .order('recorded_at', {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      'Error obteniendo último registro de peso:',
      error
    );

    throw new Error(
      `No fue posible obtener el último registro: ${error.message}`
    );
  }

  if (!data) {
    return null;
  }

  return mapWeightRecord(data);
};

export const saveWeightRecord = async (
  record: SaveWeightRecordData
): Promise<WeightRecord> => {
  const user = await getAuthenticatedUser();

  const { data, error } = await supabase
    .from('weight_records')
    .insert({
      user_id: user.id,
      weight_kg: record.weightKg,
      height_cm: record.heightCm,
      bmi: record.imc,
      category: record.category,
    })
    .select(
      'id, user_id, weight_kg, height_cm, bmi, category, recorded_at, created_at'
    )
    .single();

  if (error) {
    console.error(
      'Error guardando registro de peso:',
      error
    );

    throw new Error(
      `No fue posible guardar el registro: ${error.message}`
    );
  }

  return mapWeightRecord(data);
};