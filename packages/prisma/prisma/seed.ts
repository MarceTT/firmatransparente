import { PrismaClient, Rol, Plan, TipoCaso, EtapaCaso, TipoAccion, EstadoCuota } from '@prisma/client';
import { hash } from 'bcrypt';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

const BCRYPT_COST = 10;

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data (in reverse order of dependencies)
  await prisma.cuota.deleteMany();
  await prisma.accion.deleteMany();
  await prisma.documento.deleteMany();
  await prisma.caso.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.estudio.deleteMany();

  console.log('📦 Creating Estudio...');

  // 1. Create test Estudio
  const estudio = await prisma.estudio.create({
    data: {
      id: createId(),
      nombre: 'Estudio Jurídico Test SpA',
      rut: '76.123.456-7',
      plan: Plan.PROFESIONAL,
    },
  });

  console.log(`   ✓ Estudio: ${estudio.nombre} (${estudio.id})`);

  console.log('👥 Creating Usuarios...');

  // 2. Create test Usuarios
  const passwordHash = await hash('password123', BCRYPT_COST);

  const supervisor = await prisma.usuario.create({
    data: {
      id: createId(),
      estudioId: estudio.id,
      nombre: 'María González Supervisor',
      email: 'supervisor@test.cl',
      passwordHash,
      rol: Rol.SUPERVISOR,
      activo: true,
    },
  });

  const abogado = await prisma.usuario.create({
    data: {
      id: createId(),
      estudioId: estudio.id,
      nombre: 'Carlos Pérez Abogado',
      email: 'abogado@test.cl',
      passwordHash,
      rol: Rol.ABOGADO,
      activo: true,
    },
  });

  // Create test clients (required for Caso relations)
  const cliente1 = await prisma.usuario.create({
    data: {
      id: createId(),
      estudioId: estudio.id,
      nombre: 'Juan Muñoz Soto',
      email: 'juan.munoz@cliente.test',
      passwordHash: null, // CLIENTE uses token access
      rol: Rol.CLIENTE,
      activo: true,
    },
  });

  const cliente2 = await prisma.usuario.create({
    data: {
      id: createId(),
      estudioId: estudio.id,
      nombre: 'Ana Flores Díaz',
      email: 'ana.flores@cliente.test',
      passwordHash: null,
      rol: Rol.CLIENTE,
      activo: true,
    },
  });

  const cliente3 = await prisma.usuario.create({
    data: {
      id: createId(),
      estudioId: estudio.id,
      nombre: 'Pedro Rojas Vargas',
      email: 'pedro.rojas@cliente.test',
      passwordHash: null,
      rol: Rol.CLIENTE,
      activo: true,
    },
  });

  console.log(`   ✓ Supervisor: ${supervisor.email}`);
  console.log(`   ✓ Abogado: ${abogado.email}`);
  console.log(`   ✓ Clientes: 3 created`);

  console.log('📋 Creating Casos...');

  // 3. Create sample Casos
  const caso1 = await prisma.caso.create({
    data: {
      id: createId(),
      estudioId: estudio.id,
      titulo: 'Demanda por despido injustificado',
      descripcion: 'Cliente fue despedido sin motivo justificado tras 5 años de servicio',
      tipoCaso: TipoCaso.LABORAL,
      etapa: EtapaCaso.INGRESO,
      rol: 'O-2987-2026',
      abogadoId: abogado.id,
      clienteId: cliente1.id,
      tokenCliente: createId(),
      ultimaAccion: new Date(),
    },
  });

  const caso2 = await prisma.caso.create({
    data: {
      id: createId(),
      estudioId: estudio.id,
      titulo: 'Regulación de visitas',
      descripcion: 'Padre solicita régimen de visitas ampliado para sus dos hijos menores',
      tipoCaso: TipoCaso.FAMILIA,
      etapa: EtapaCaso.TRAMITACION,
      rol: 'C-456-2026',
      abogadoId: abogado.id,
      clienteId: cliente2.id,
      tokenCliente: createId(),
      ultimaAccion: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
  });

  const caso3 = await prisma.caso.create({
    data: {
      id: createId(),
      estudioId: estudio.id,
      titulo: 'Cobro de facturas impagas',
      descripcion: 'Demanda de cobro por facturas vencidas hace más de 90 días',
      tipoCaso: TipoCaso.COMERCIAL,
      etapa: EtapaCaso.CERRADO,
      rol: 'C-123-2025',
      abogadoId: abogado.id,
      clienteId: cliente3.id,
      tokenCliente: createId(),
      ultimaAccion: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    },
  });

  console.log(`   ✓ Caso 1 (INGRESO): ${caso1.titulo}`);
  console.log(`   ✓ Caso 2 (TRAMITACION): ${caso2.titulo}`);
  console.log(`   ✓ Caso 3 (CERRADO): ${caso3.titulo}`);

  console.log('⚡ Creating Acciones...');

  // 4. Create Acciones for each case
  const acciones = await prisma.accion.createMany({
    data: [
      // Caso 1 - INGRESO (2 acciones)
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso1.id,
        tipo: TipoAccion.DOCUMENTO,
        descripcionTecnica: 'Recepción de antecedentes laborales y contrato de trabajo',
        descripcionCliente: 'Recibimos todos tus documentos laborales para estudiar tu caso',
        proximoPaso: 'Revisar documentación y preparar demanda',
        visibleCliente: true,
        registradoPorId: abogado.id,
        creadoEn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso1.id,
        tipo: TipoAccion.ESCRITO,
        descripcionTecnica: 'Redacción de demanda por despido injustificado Art. 168 CT',
        descripcionCliente: 'Estamos preparando la demanda para presentarla al tribunal',
        proximoPaso: 'Presentar demanda en Juzgado de Letras del Trabajo',
        visibleCliente: true,
        registradoPorId: abogado.id,
        creadoEn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      // Caso 2 - TRAMITACION (2 acciones)
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso2.id,
        tipo: TipoAccion.ESCRITO,
        descripcionTecnica: 'Presentación de solicitud de regulación de visitas',
        descripcionCliente: 'Presentamos tu solicitud de visitas al tribunal',
        proximoPaso: 'Esperar resolución del tribunal',
        visibleCliente: true,
        registradoPorId: abogado.id,
        creadoEn: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso2.id,
        tipo: TipoAccion.RESOLUCION,
        descripcionTecnica: 'Notificación de audiencia preparatoria para el 15/06/2026',
        descripcionCliente: 'El tribunal fijó fecha para la audiencia: 15 de junio de 2026',
        proximoPaso: 'Preparar documentación para audiencia',
        visibleCliente: true,
        registradoPorId: abogado.id,
        creadoEn: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      // Caso 3 - CERRADO (2 acciones)
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso3.id,
        tipo: TipoAccion.AUDIENCIA,
        descripcionTecnica: 'Audiencia de conciliación - se logra acuerdo de pago en 3 cuotas',
        descripcionCliente: 'Llegamos a un acuerdo favorable: el deudor pagará en 3 cuotas',
        proximoPaso: null,
        visibleCliente: true,
        registradoPorId: abogado.id,
        creadoEn: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      },
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso3.id,
        tipo: TipoAccion.RESOLUCION,
        descripcionTecnica: 'Caso cerrado - cobro completado satisfactoriamente',
        descripcionCliente: 'Tu caso ha sido cerrado exitosamente. Se cobraron todas las facturas.',
        proximoPaso: null,
        visibleCliente: true,
        registradoPorId: abogado.id,
        creadoEn: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  console.log(`   ✓ Created ${acciones.count} acciones`);

  console.log('💰 Creating Cuotas...');

  // 5. Create Cuotas for testing payments
  const cuotas = await prisma.cuota.createMany({
    data: [
      // Cuota pendiente para caso 1
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso1.id,
        monto: 50000000, // $500,000 CLP in centavos
        vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        estado: EstadoCuota.PENDIENTE,
        pagadoEn: null,
      },
      // Cuota vencida para caso 2
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso2.id,
        monto: 30000000, // $300,000 CLP in centavos
        vencimiento: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        estado: EstadoCuota.VENCIDA,
        pagadoEn: null,
      },
      // Cuota pagada para caso 3
      {
        id: createId(),
        estudioId: estudio.id,
        casoId: caso3.id,
        monto: 75000000, // $750,000 CLP in centavos
        vencimiento: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        estado: EstadoCuota.PAGADA,
        pagadoEn: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000), // Paid 55 days ago
      },
    ],
  });

  console.log(`   ✓ Created ${cuotas.count} cuotas`);

  console.log('');
  console.log('✅ Seed completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log('   - 1 Estudio');
  console.log('   - 5 Usuarios (1 supervisor, 1 abogado, 3 clientes)');
  console.log('   - 3 Casos (INGRESO, TRAMITACION, CERRADO)');
  console.log(`   - ${acciones.count} Acciones`);
  console.log(`   - ${cuotas.count} Cuotas`);
  console.log('');
  console.log('🔑 Test credentials:');
  console.log('   - supervisor@test.cl / password123');
  console.log('   - abogado@test.cl / password123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
