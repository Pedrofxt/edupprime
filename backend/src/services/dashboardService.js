const prisma = require('../database/prismaClient');

async function studentDashboard(userId) {
  const enrollments = await prisma.enrollment.findMany({ where: { userId }, include: { course: true } });
  const certificates = await prisma.certificate.findMany({ where: { usuarioId: userId } });
  const exercises = await prisma.answer.findMany({ where: { userId } });
  const subscription = await prisma.user.findUnique({ where: { id: userId }, select: { plano: true } });

  return {
    cursosMatriculados: enrollments.length,
    progresso: enrollments.map((item) => ({ curso: item.course.titulo, progresso: item.progress })),
    certificados: certificates,
    assinatura: subscription.plano,
    exerciciosRealizados: exercises.length,
  };
}

async function teacherDashboard(userId) {
  const courses = await prisma.course.findMany({ where: { authorId: userId }, include: { enrollments: true, ratings: true } });
  const receita = courses.reduce((sum, course) => sum + course.enrollments.length * 0, 0);
  return {
    cursosCriados: courses.length,
    numeroAlunos: courses.reduce((sum, course) => sum + course.enrollments.length, 0),
    receitaGerada: receita,
    avaliacoes: courses.flatMap((course) => course.ratings),
  };
}

async function adminDashboard() {
  const totalUsers = await prisma.user.count();
  const totalSubscribers = await prisma.user.count({ where: { plano: 'PREMIUM' } });
  const receitaMensal = await prisma.payment.aggregate({
    _sum: { valor: true },
    where: { dataPagamento: { gte: new Date(new Date().setDate(new Date().getDate() - 30)) }, status: 'APROVADO' },
  });
  const receitaAnual = await prisma.payment.aggregate({
    _sum: { valor: true },
    where: { dataPagamento: { gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)) }, status: 'APROVADO' },
  });
  const coursesActive = await prisma.course.count({ where: { status: 'ATIVO' } });
  const coursesCompleted = await prisma.enrollment.count({ where: { status: 'CONCLUIDO' } });

  return {
    totalUsuarios: totalUsers,
    totalAssinantes: totalSubscribers,
    receitaMensal: receitaMensal._sum.valor || 0,
    receitaAnual: receitaAnual._sum.valor || 0,
    cursosAtivos: coursesActive,
    cursosConcluidos: coursesCompleted,
  };
}

module.exports = { studentDashboard, teacherDashboard, adminDashboard };